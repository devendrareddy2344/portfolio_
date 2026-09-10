"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

// Individual Node in the Agent Decision Graph
interface NodeProps {
  position: [number, number, number];
  color: string;
  label: string;
  sublabel: string;
  size?: number;
  isCore?: boolean;
  onClick?: () => void;
}

function GraphNode({ position, color, label, sublabel, size = 0.35, isCore = false, onClick }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isCore ? 0.8 : 0.4);
      meshRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
      ringRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Central Node Mesh */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {isCore ? (
          <icosahedronGeometry args={[size, 1]} />
        ) : (
          <octahedronGeometry args={[size, 0]} />
        )}
        <meshStandardMaterial
          color={hovered ? "#00f0ff" : color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : isCore ? 0.8 : 0.4}
          roughness={0.2}
          metalness={0.8}
          wireframe={!isCore}
        />
      </mesh>

      {/* Core Orbital Energy Ring */}
      {isCore && (
        <mesh ref={ringRef}>
          <torusGeometry args={[size * 1.6, 0.02, 16, 64]} />
          <meshBasicMaterial color="#00f0ff" wireframe />
        </mesh>
      )}

      {/* HTML Label floating next to node */}
      <Html
        position={[0, size + 0.3, 0]}
        center
        distanceFactor={8}
        className="pointer-events-none select-none transition-opacity duration-300"
      >
        <div className="flex flex-col items-center px-2 py-1 rounded bg-[#090d18]/90 border border-cyan-500/40 backdrop-blur-md shadow-lg shadow-cyan-950/40">
          <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-300 uppercase whitespace-nowrap">
            {label}
          </span>
          <span className="text-[8px] font-mono text-slate-400 whitespace-nowrap">
            {sublabel}
          </span>
        </div>
      </Html>
    </group>
  );
}

// Glowing connection line between two nodes with moving data pulses
function DataStream({
  start,
  end,
  color = "#00f0ff",
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}) {
  const points = useMemo(() => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
    mid.y += 0.25; // Subtle curve arc
    const curve = new THREE.QuadraticBezierCurve3(vStart, mid, vEnd);
    return curve.getPoints(30);
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const packetRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (packetRef.current) {
      const t = (state.clock.getElapsedTime() * 0.75) % 1;
      const index = Math.floor(t * (points.length - 1));
      const nextIndex = Math.min(index + 1, points.length - 1);
      const subT = (t * (points.length - 1)) % 1;
      packetRef.current.position.lerpVectors(points[index], points[nextIndex], subT);
    }
  });

  return (
    <group>
      {/* Static connector line */}
      <primitive object={new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 })
      )} />

      {/* Traveling Data Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Interactive Scene with mouse cursor reactivity
function AgentGraphScene({ onCoreClick }: { onCoreClick?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);

  // Agent Cognitive Node Coordinates
  const nodes = useMemo(() => {
    return {
      input: [-2.2, 0.8, 0] as [number, number, number],
      core: [0, 0, 0] as [number, number, number],
      memory: [-0.6, -1.5, 0.6] as [number, number, number],
      tools: [0.8, 1.4, -0.4] as [number, number, number],
      output: [2.2, -0.4, 0] as [number, number, number],
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating + cursor damping
      const mouseX = state.pointer.x * 0.4;
      const mouseY = state.pointer.y * 0.3;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Nodes */}
        <GraphNode
          position={nodes.input}
          color="#38bdf8"
          label="Perception / Input"
          sublabel="Multi-Modal Streams"
          size={0.28}
        />
        <GraphNode
          position={nodes.core}
          color="#00f0ff"
          label="Planner / Reasoner"
          sublabel="Autonomous Agent Core"
          size={0.48}
          isCore
          onClick={onCoreClick}
        />
        <GraphNode
          position={nodes.memory}
          color="#818cf8"
          label="FAISS Memory"
          sublabel="Vector Store & Context"
          size={0.28}
        />
        <GraphNode
          position={nodes.tools}
          color="#c084fc"
          label="Tool Execution"
          sublabel="Scrapers & DB Engines"
          size={0.28}
        />
        <GraphNode
          position={nodes.output}
          color="#34d399"
          label="Action / Verdict"
          sublabel="Deterministic Execution"
          size={0.3}
        />

        {/* Data Stream Connections */}
        <DataStream start={nodes.input} end={nodes.core} color="#38bdf8" />
        <DataStream start={nodes.core} end={nodes.memory} color="#818cf8" />
        <DataStream start={nodes.core} end={nodes.tools} color="#c084fc" />
        <DataStream start={nodes.memory} end={nodes.core} color="#818cf8" />
        <DataStream start={nodes.tools} end={nodes.core} color="#c084fc" />
        <DataStream start={nodes.core} end={nodes.output} color="#34d399" />
      </group>
    </Float>
  );
}

export default function AgentCanvas3D() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleCoreClick = () => {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[360px] flex items-center justify-center bg-[#070b14]/50 rounded-2xl border border-slate-800/60">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          Initializing Agent Node Graph...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[360px] sm:h-[440px] md:h-[500px] relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#080d1a]/80 via-[#060913]/90 to-[#04060c] border border-cyan-500/20 shadow-2xl shadow-cyan-950/20">
      {/* Background ambient grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Top telemetry banner */}
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-sm">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-slate-300 font-semibold">AGENT ARCHITECTURE</span>
        <span className="text-slate-500">|</span>
        <span className="text-cyan-400">INPUT ➔ REASON ➔ ACT</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400 text-[10px]">Click core to navigate</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: isMobile ? 55 : 45 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#818cf8" />
        <AgentGraphScene onCoreClick={handleCoreClick} />
      </Canvas>
    </div>
  );
}

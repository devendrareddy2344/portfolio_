import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Devendra Reddy | AI & GenAI Systems Engineer",
  description:
    "Portfolio of Devendra Reddy — AI / GenAI Systems Engineer. Architecting agentic AI pipelines, retrieval-augmented reasoning (RAG), and applied ML microservices.",
  keywords: [
    "Devendra Reddy",
    "AI Engineer",
    "GenAI Engineer",
    "Machine Learning",
    "RAG",
    "Agentic AI",
    "FastAPI",
    "FAISS",
    "LangChain",
    "LangGraph"
  ],
  authors: [{ name: "Devendra Reddy", url: "https://github.com/devendrareddy2344" }],
  openGraph: {
    title: "Devendra Reddy | AI & GenAI Systems Engineer",
    description:
      "I build systems that decide, not just respond. Agentic pipelines, retrieval-augmented reasoning, and robust backend microservices.",
    url: "https://devendrareddy2344.github.io/portfolio/",
    siteName: "Devendra Reddy Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devendra Reddy | AI & GenAI Systems Engineer",
    description: "Agentic AI systems, RAG pipelines, and applied machine learning.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#050811] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}

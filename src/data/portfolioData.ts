export interface Project {
  id: string;
  title: string;
  repoName: string;
  repoUrl: string;
  oneLiner: string;
  problemSolved: string;
  techTags: string[];
  architectureSteps: {
    label: string;
    sublabel: string;
    type: 'input' | 'process' | 'model' | 'output';
  }[];
  keyHighlights: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  contributions: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  details: string;
}

export interface SkillCategory {
  category: string;
  badge: string;
  skills: { name: string; level?: 'advanced' | 'proficient' | 'upskilling'; tag?: string }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Devendra Reddy",
    fullName: "Vennapusa Devendra Reddy",
    role: "AI / GenAI Systems Engineer",
    degree: "B.Tech in CS (AI & Data Science), 2025 Graduate",
    cgpa: "8.4 / 10",
    college: "Audisankara Institute of Technology, Gudur",
    email: "devendrareddy2344@gmail.com",
    github: "https://github.com/devendrareddy2344",
    linkedin: "https://www.linkedin.com/in/devendrareddy02/",
    positioning: "I build agentic AI systems, RAG pipelines, and applied ML — not just prompt wrapping.",
    headline: "I build systems that decide, not just respond.",
    subline: "Agentic pipelines, retrieval-augmented reasoning, and the backend plumbing that keeps them honest under real constraints.",
    closingStatement: "Looking for an AI engineer who ships systems, not just demos."
  },

  experiences: [
    {
      role: "AI/ML Intern",
      company: "Syncs Group",
      period: "2026",
      contributions: [
        "Architected and contributed to scalable AI microservices and applied ML pipelines for high-throughput operational intelligence.",
        "Engineered robust data extraction and preprocessing pipelines powering downstream dynamic market intelligence.",
        "Streamlined API contracts and inference latency for production multimodal AI services."
      ]
    },
    {
      role: "AI Intern",
      company: "TeckyBot",
      period: "Jan 2025 – Mar 2025",
      contributions: [
        "Developed end-to-end predictive and classification models using scikit-learn on structured real-world datasets.",
        "Designed and implemented Generative AI conversational workflows and prompt orchestration for automated customer intelligence.",
        "Conducted exploratory data analysis, data cleaning, and feature selection to optimize model generalization."
      ]
    }
  ] as Experience[],

  projects: [
    {
      id: "dynamic-pricing",
      title: "Dynamic Pricing Intelligence Platform",
      repoName: "Dynamic_Pricing_Intelligence_Platform",
      repoUrl: "https://github.com/devendrareddy2344/Dynamic_Pricing_Intelligence_Platform",
      oneLiner: "Autonomous microservice pipeline integrating stealth evasion scraping, unsupervised ML clustering, and multimodal GenAI market analysis.",
      problemSolved: "Eliminates manual competitive price monitoring by orchestrating headless browser scrapers, DBSCAN clustering for price whitespace identification, and automated OpenRouter LLM executive synthesis.",
      techTags: ["FastAPI", "React Vite", "Playwright", "Scikit-Learn (DBSCAN)", "OpenRouter Vision/LLM", "PostgreSQL", "Docker"],
      architectureSteps: [
        { label: "Product Ingestion", sublabel: "Image / SKU Input via Dashboard", type: "input" },
        { label: "Vision & Stealth Scraping", sublabel: "Playwright Evasion across Top Vendors", type: "process" },
        { label: "ML Clustering Engine", sublabel: "DBSCAN & KMeans Price Positioning", type: "model" },
        { label: "GenAI Strategic Synthesis", sublabel: "OpenRouter LLM Executive Recommendations", type: "output" }
      ],
      keyHighlights: [
        "Distributed microservice architecture orchestrated via central FastAPI gateway",
        "Stealth browser rotation evades bot detection across Flipkart, Amazon, Walmart & BestBuy",
        "Unsupervised clustering dynamically spots overpriced/underpriced SKU boundaries"
      ]
    },
    {
      id: "clinical-trials",
      title: "AI Clinical Trial Contradiction Engine",
      repoName: "AI_Clinical_Trials",
      repoUrl: "https://github.com/devendrareddy2344/AI_Clinical_Trials",
      oneLiner: "Clinical decision-support engine parsing trial protocols to uncover explicit and silent patient exclusion contradictions using Clinical BERT.",
      problemSolved: "Replaces slow manual protocol reviews by ingesting multi-page clinical trial PDFs, vectorizing medical criteria with MPNet, and cross-checking historical patient biomarkers for hidden contraindications.",
      techTags: ["Python", "FastAPI", "Clinical BERT", "Sentence Transformers (MPNet)", "FAISS", "Mem0 Memory", "Redis", "PostgreSQL"],
      architectureSteps: [
        { label: "Protocol & EHR Ingestion", sublabel: "PDF Parsing & Patient Lab Normalization", type: "input" },
        { label: "Clinical BERT Extraction", sublabel: "Inclusion / Exclusion Boundary Parsing", type: "process" },
        { label: "FAISS Vector Memory", sublabel: "MPNet Semantic Condition Mapping", type: "model" },
        { label: "Silent Contradiction Verdict", sublabel: "Mem0 Evaluation of Biomarker Thresholds", type: "output" }
      ],
      keyHighlights: [
        "Surfaces silent exclusion triggers (e.g. subtle eGFR rate drops) that humans frequently miss",
        "Fast semantic retrieval via persisted FAISS index coupled with Mem0 conversational memory",
        "Strict medical verification pipeline with reproducible audit trail"
      ]
    },
    {
      id: "enterprise-sop-rag",
      title: "Enterprise SOP & Policy Knowledge Assistant",
      repoName: "Enterprise-SOP-Policy-Knowledge-Assistant-using-Generative-AI-with-RAG",
      repoUrl: "https://github.com/devendrareddy2344/Enterprise-SOP-Policy-Knowledge-Assistant-using-Generative-AI-with-RAG",
      oneLiner: "Production-ready RAG assistant enforcing strict microservice decoupling, chunk-level FAISS vector retrieval, and role-based access control.",
      problemSolved: "Protects sensitive enterprise documentation by isolating knowledge tiers through RBAC tokens while guaranteeing zero-hallucination answers strictly bound to retrieved SOP chunks.",
      techTags: ["Python", "FastAPI", "Streamlit", "FAISS Index", "OpenAI GPT-3.5 Turbo", "RBAC Auth", "Audit CSV Logging"],
      architectureSteps: [
        { label: "Secure Query Ingestion", sublabel: "Streamlit UI + Role-Based Access Token", type: "input" },
        { label: "FastAPI RBAC Gateway", sublabel: "Permission Validation & Partitioning", type: "process" },
        { label: "FAISS Similarity Search", sublabel: "Semantic Chunk Retrieval & Ranking", type: "model" },
        { label: "Strict Grounded Output", sublabel: "Audit-Logged GPT-3.5 Response Generation", type: "output" }
      ],
      keyHighlights: [
        "Strict separation of concerns: Streamlit frontend never speaks directly to the LLM",
        "Role-based document filtering prevents unauthorized policy disclosure",
        "Comprehensive logging of query latency, similarity confidence, and response metadata"
      ]
    },
    {
      id: "ai-coding-agent",
      title: "Atlas: Autonomous AI Coding & Code Review Agent",
      repoName: "AI_Coding_Agent_Assignment",
      repoUrl: "https://github.com/devendrareddy2344/AI_Coding_Agent_Assignment",
      oneLiner: "Autonomous software engineering agent independently exploring codebases, formulating dependency plans, executing AST code transformations, and verifying syntax.",
      problemSolved: "Eliminates manual architectural code reviews and refactoring by scanning ASTs, synthesizing execution dependency graphs, performing self-healing syntax edits (node --check), and generating executive security and performance audit reports.",
      techTags: ["Python 3.11", "Streamlit UI", "AST Code Parsing", "Multi-LLM (Claude / GPT-4o / Gemini)", "Self-Healing Syntax Loops", "Subprocess Isolation", "OpenRouter"],
      architectureSteps: [
        { label: "Repo Explorer", sublabel: "Static & AST Repository Graph Mapping", type: "input" },
        { label: "Execution Planner", sublabel: "JSON Task Graph & Risk Trade-off Analysis", type: "process" },
        { label: "Code Executor", sublabel: "AST Patching with Self-Healing Loops", type: "model" },
        { label: "Verifier & Reviewer", sublabel: "Static Syntax Audit & Executive Reporting", type: "output" }
      ],
      keyHighlights: [
        "Multi-provider LLM adapter (Claude 3.5 Sonnet, GPT-4o, Gemini 2.5 Flash, OpenRouter) with deterministic heuristic fallback",
        "Self-healing execution loop automatically detects syntax and regression errors, re-prompting the executor until tests pass",
        "Comprehensive automated executive reports with security audits, performance reviews, and diff logs"
      ]
    }
  ] as Project[],

  skills: [
    {
      category: "GenAI, LLMs & Agents",
      badge: "Decision & Reasoning",
      skills: [
        { name: "LangChain & LangGraph", level: "advanced" },
        { name: "RAG Pipeline Architecture", level: "advanced" },
        { name: "Agentic Reasoning & Tool Use", level: "advanced" },
        { name: "Prompt Engineering & Guardrails", level: "advanced" },
        { name: "OpenAI GPT & Azure OpenAI", level: "advanced" },
        { name: "Google Gemini Models", level: "proficient" },
        { name: "Multi-Agent Swarm Orchestration", level: "upskilling", tag: "Currently Upskilling" }
      ]
    },
    {
      category: "Applied ML, NLP & Vision",
      badge: "Quantitative Intelligence",
      skills: [
        { name: "PyTorch & TensorFlow", level: "proficient" },
        { name: "Scikit-Learn (DBSCAN, KMeans)", level: "advanced" },
        { name: "Hugging Face Transformers", level: "advanced" },
        { name: "Clinical BERT & MPNet Embeddings", level: "advanced" },
        { name: "OpenCV & Computer Vision", level: "proficient" },
        { name: "Statistical Modeling & Feature Eng.", level: "advanced" },
        { name: "Low-Latency Model Quantization", level: "upskilling", tag: "Currently Upskilling" }
      ]
    },
    {
      category: "Backend, Vector DBs & Systems",
      badge: "Reliable Plumbing",
      skills: [
        { name: "Python (AsyncIO / Multiprocessing)", level: "advanced" },
        { name: "FastAPI REST Microservices", level: "advanced" },
        { name: "FAISS & ChromaDB Vector Stores", level: "advanced" },
        { name: "PostgreSQL & TimescaleDB", level: "proficient" },
        { name: "Docker Containerization", level: "proficient" },
        { name: "Redis & Mem0 AI Memory", level: "proficient" },
        { name: "Playwright Stealth Scraping", level: "advanced" }
      ]
    },
    {
      category: "Frontend & Production Tooling",
      badge: "Interfaces & Delivery",
      skills: [
        { name: "React & Next.js", level: "advanced" },
        { name: "TypeScript", level: "proficient" },
        { name: "Tailwind CSS & Framer Motion", level: "advanced" },
        { name: "Streamlit UI", level: "advanced" },
        { name: "Git & GitHub CI/CD", level: "advanced" },
        { name: "Vercel & Render Deployment", level: "proficient" }
      ]
    }
  ] as SkillCategory[],

  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (AI & Data Science)",
      institution: "Audisankara Institute of Technology, Gudur",
      period: "2021 – 2025",
      grade: "CGPA: 8.4 / 10",
      details: "Comprehensive coursework in Machine Learning, Deep Neural Networks, Natural Language Processing, Database Management Systems, and Discrete Mathematics."
    },
    {
      degree: "Higher Secondary Certificate (Class XII, MPC)",
      institution: "B S R Junior College",
      period: "2019 – 2021",
      details: "Major disciplines in Physics, Mathematics, and Chemistry with rigorous analytical problem-solving foundation."
    },
    {
      degree: "Secondary School Certificate (Class X)",
      institution: "Zilla Parishad High School",
      period: "Passed 2019",
      details: "Completed secondary education with high academic achievement."
    }
  ] as Education[],

  resumes: [
    {
      title: "AI Systems & GenAI Resume",
      subtitle: "Tailored for AI Systems, Agentic Architectures, RAG Pipelines, and LLM Engineering",
      filename: "V_Devendra_AI_Engineer.pdf",
      url: "/resumes/V_Devendra_AI_Engineer.pdf",
      badge: "AI Engineer • Primary Official"
    },
    {
      title: "AI & Applied ML Resume",
      subtitle: "Tailored for Applied Machine Learning, Deep Learning models, and Data Intelligence",
      filename: "Devendra_Reddy_AI_ML.pdf",
      url: "/resumes/Devendra_Reddy_AI_ML.pdf",
      badge: "AI / ML Focus • Official"
    },
    {
      title: "ATS-Optimized Resume",
      subtitle: "Single-column semantic plaintext layout structured for enterprise portal ATS parsers",
      filename: "devendra_reddy_resume_ats.pdf",
      url: "/resumes/devendra_reddy_resume_ats.pdf",
      badge: "ATS 100% Scannable"
    },
    {
      title: "Executive Designed Resume",
      subtitle: "Signal-cyan dark executive layout matching the portfolio's systems design language",
      filename: "devendra_reddy_resume_designed.pdf",
      url: "/resumes/devendra_reddy_resume_designed.pdf",
      badge: "Executive Tech • Recruiter Ready"
    }
  ]
};

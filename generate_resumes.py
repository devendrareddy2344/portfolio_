import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def create_ats_resume(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Base ATS typography
    name_style = ParagraphStyle(
        'ATSName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=19,
        leading=23,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#111827')
    )
    
    contact_style = ParagraphStyle(
        'ATSContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#374151')
    )
    
    summary_style = ParagraphStyle(
        'ATSSummary',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#1f2937')
    )
    
    section_head_style = ParagraphStyle(
        'ATSSectionHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#111827'),
        spaceBefore=8,
        spaceAfter=3
    )
    
    item_title_style = ParagraphStyle(
        'ATSItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#111827')
    )
    
    item_sub_style = ParagraphStyle(
        'ATSItemSub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#4b5563')
    )
    
    bullet_style = ParagraphStyle(
        'ATSBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=12.2,
        textColor=colors.HexColor('#1f2937'),
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2
    )

    story = []
    
    # Header
    story.append(Paragraph("VENNAPUSA DEVENDRA REDDY", name_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Email: devendrareddy2344@gmail.com | Phone: +91 9391103997 | Location: Andhra Pradesh, India<br/>"
        "GitHub: github.com/devendrareddy2344 | LinkedIn: linkedin.com/in/devendrareddy02",
        contact_style
    ))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#111827'), spaceBefore=2, spaceAfter=6))
    
    # Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_head_style))
    story.append(Paragraph(
        "AI & GenAI Engineer with a strong foundation in Computer Science (AI & Data Science, CGPA 8.4). "
        "Specialized in architecting agentic AI systems, production RAG pipelines, microservice backends, and applied machine learning models. "
        "Focused on engineering autonomous pipelines that decide, reason, and act with rigorous reliability under real-world constraints.",
        summary_style
    ))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#9ca3af'), spaceBefore=2, spaceAfter=4))
    
    # Education
    story.append(Paragraph("EDUCATION", section_head_style))
    edu_data = [
        [
            Paragraph("<b>Audisankara Institute of Technology</b> — Gudur, AP", item_title_style),
            Paragraph("<b>2021 – 2025</b>", ParagraphStyle('Right1', parent=item_title_style, alignment=TA_RIGHT))
        ],
        [
            Paragraph("Bachelor of Technology: Computer Science & Engineering (AI & Data Science) — <b>CGPA: 8.4 / 10</b>", item_sub_style),
            Paragraph("", item_sub_style)
        ],
        [
            Paragraph("<b>B S R Junior College</b> — Higher Secondary (Class XII, MPC)", item_title_style),
            Paragraph("<b>2019 – 2021</b>", ParagraphStyle('Right2', parent=item_title_style, alignment=TA_RIGHT))
        ],
        [
            Paragraph("<b>Zilla Parishad High School</b> — Secondary School Certificate (Class X)", item_title_style),
            Paragraph("<b>Passed 2019</b>", ParagraphStyle('Right3', parent=item_title_style, alignment=TA_RIGHT))
        ]
    ]
    t_edu = Table(edu_data, colWidths=[410, 130])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#9ca3af'), spaceBefore=2, spaceAfter=4))
    
    # Experience
    story.append(Paragraph("WORK EXPERIENCE", section_head_style))
    
    # Syncs Group
    exp1 = [
        [
            Paragraph("<b>Syncs Group</b> — AI/ML Intern", item_title_style),
            Paragraph("<b>2026</b>", ParagraphStyle('R_Exp1', parent=item_title_style, alignment=TA_RIGHT))
        ]
    ]
    t_exp1 = Table(exp1, colWidths=[410, 130])
    t_exp1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_exp1)
    story.append(Paragraph("• Contributed to the development of scalable AI systems and end-to-end applied machine learning architectures.", bullet_style))
    story.append(Paragraph("• Engineered automated data ingestion and preprocessing pipelines for high-throughput operational intelligence.", bullet_style))
    story.append(Paragraph("• Collaborated on microservice integration and API contract optimization to streamline inference latency.", bullet_style))
    story.append(Spacer(1, 3))
    
    # TeckyBot
    exp2 = [
        [
            Paragraph("<b>TeckyBot</b> — AI Intern", item_title_style),
            Paragraph("<b>Jan 2025 – Mar 2025</b>", ParagraphStyle('R_Exp2', parent=item_title_style, alignment=TA_RIGHT))
        ]
    ]
    t_exp2 = Table(exp2, colWidths=[410, 130])
    t_exp2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_exp2)
    story.append(Paragraph("• Engineered predictive and classification models using scikit-learn and neural network pipelines for structured datasets.", bullet_style))
    story.append(Paragraph("• Implemented Generative AI conversational flows and prompt orchestration workflows for automated customer query resolution.", bullet_style))
    story.append(Paragraph("• Performed data cleaning, exploratory data analysis, and feature engineering to enhance model accuracy and robustness.", bullet_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#9ca3af'), spaceBefore=2, spaceAfter=4))
    
    # Key Projects
    story.append(Paragraph("KEY TECHNICAL PROJECTS", section_head_style))
    
    # Project 1
    p1 = [
        [
            Paragraph("<b>Dynamic Pricing Intelligence Platform</b> | <i>FastAPI, Playwright, Scikit-learn, OpenRouter Vision/LLM, PostgreSQL, Docker</i>", item_title_style),
            Paragraph("<b>github.com/devendrareddy2344/Dynamic_Pricing...</b>", ParagraphStyle('RP1', parent=item_sub_style, alignment=TA_RIGHT, fontSize=7.5))
        ]
    ]
    t_p1 = Table(p1, colWidths=[380, 160])
    t_p1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_p1)
    story.append(Paragraph("• Built an autonomous microservice platform evaluating competitive market viability through multi-channel stealth web extraction.", bullet_style))
    story.append(Paragraph("• Implemented DBSCAN & KMeans clustering algorithms in scikit-learn to isolate optimal market price points and elasticity metrics.", bullet_style))
    story.append(Paragraph("• Connected multimodal OpenRouter vision and LLM models to generate actionable strategic analysis from live e-commerce streams.", bullet_style))
    story.append(Spacer(1, 3))
    
    # Project 2
    p2 = [
        [
            Paragraph("<b>AI Clinical Trial Eligibility & Contradiction Engine</b> | <i>Clinical BERT, Sentence Transformers, FAISS, Mem0, FastAPI</i>", item_title_style),
            Paragraph("<b>github.com/devendrareddy2344/AI_Clinical_Trials</b>", ParagraphStyle('RP2', parent=item_sub_style, alignment=TA_RIGHT, fontSize=7.5))
        ]
    ]
    t_p2 = Table(p2, colWidths=[380, 160])
    t_p2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_p2)
    story.append(Paragraph("• Designed an automated clinical decision engine parsing trial protocol PDFs and validating patient eligibility contraindications.", bullet_style))
    story.append(Paragraph("• Integrated Clinical BERT and MPNet embeddings with FAISS vector indexing to semantically evaluate exclusion criteria.", bullet_style))
    story.append(Paragraph("• Integrated Mem0 AI memory layer to surface silent exclusion contradictions across historical patient lab panels (e.g. eGFR thresholds).", bullet_style))
    story.append(Spacer(1, 3))
    
    # Project 3
    p3 = [
        [
            Paragraph("<b>Enterprise SOP & Policy Knowledge Assistant (RAG System)</b> | <i>FastAPI, Streamlit, FAISS, OpenAI GPT-3.5, RBAC</i>", item_title_style),
            Paragraph("<b>github.com/devendrareddy2344/Enterprise-SOP...</b>", ParagraphStyle('RP3', parent=item_sub_style, alignment=TA_RIGHT, fontSize=7.5))
        ]
    ]
    t_p3 = Table(p3, colWidths=[380, 160])
    t_p3.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_p3)
    story.append(Paragraph("• Developed an enterprise-grade RAG pipeline enforcing strict microservice separation between Streamlit UI and FastAPI backend.", bullet_style))
    story.append(Paragraph("• Implemented document ingestion, chunk-level FAISS vector indexing, and Role-Based Access Control (RBAC) filtering.", bullet_style))
    story.append(Paragraph("• Engineered grounded prompt orchestration to strictly eliminate hallucination, recording audit metrics to CSV for compliance.", bullet_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#9ca3af'), spaceBefore=2, spaceAfter=4))
    
    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_head_style))
    skills = [
        ("GenAI & LLMs:", "LangChain, LangGraph, RAG Pipelines, Prompt Engineering, OpenAI GPT models, Azure OpenAI, Gemini"),
        ("Machine Learning & NLP:", "PyTorch, TensorFlow, Keras, Hugging Face, BERT, Scikit-Learn, OpenCV, Statistical Modeling"),
        ("Backend & Data:", "Python, FastAPI, Django, FAISS, ChromaDB, PostgreSQL, Redis, TimescaleDB, Docker, REST APIs"),
        ("Frontend & Tooling:", "React, Next.js, TypeScript, Streamlit, Git, GitHub, Linux, Vercel, Render"),
        ("Focus Areas & Upskilling:", "Agentic Swarm Orchestration, Evasion Scraping, Distributed Vector Search, Low-Latency Inference")
    ]
    for category, items in skills:
        story.append(Paragraph(f"• <b>{category}</b> {items}", bullet_style))
        
    doc.build(story)
    print(f"ATS Resume generated at: {output_path}")


def create_designed_resume(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=32,
        rightMargin=32,
        topMargin=32,
        bottomMargin=32
    )
    
    styles = getSampleStyleSheet()
    
    dark_primary = colors.HexColor('#080c14')
    accent_cyan = colors.HexColor('#00f0ff')
    accent_blue = colors.HexColor('#0284c7')
    text_dark = colors.HexColor('#0f172a')
    text_muted = colors.HexColor('#475569')
    
    title_style = ParagraphStyle(
        'DTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=21,
        leading=25,
        textColor=colors.HexColor('#0a192f'),
        alignment=TA_LEFT
    )
    
    subtitle_style = ParagraphStyle(
        'DSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=accent_blue,
        alignment=TA_LEFT
    )
    
    contact_pill_style = ParagraphStyle(
        'DContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=text_muted,
        alignment=TA_RIGHT
    )
    
    section_head_style = ParagraphStyle(
        'DSectionHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=dark_primary,
        spaceBefore=7,
        spaceAfter=3
    )
    
    summary_style = ParagraphStyle(
        'DSummary',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_dark
    )
    
    item_title_style = ParagraphStyle(
        'DItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#0a192f')
    )
    
    item_date_style = ParagraphStyle(
        'DItemDate',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=accent_blue,
        alignment=TA_RIGHT
    )
    
    bullet_style = ParagraphStyle(
        'DBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.7,
        leading=12,
        textColor=text_dark,
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=2
    )

    story = []
    
    # Styled Header Block
    header_data = [
        [
            Paragraph("<b>VENNAPUSA DEVENDRA REDDY</b>", title_style),
            Paragraph("devendrareddy2344@gmail.com | +91 9391103997", contact_pill_style)
        ],
        [
            Paragraph("AI & GenAI Systems Engineer • B.Tech CS (AI & DS, CGPA 8.4)", subtitle_style),
            Paragraph("github.com/devendrareddy2344 | linkedin.com/in/devendrareddy02", contact_pill_style)
        ]
    ]
    t_head = Table(header_data, colWidths=[360, 188])
    t_head.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t_head)
    story.append(Spacer(1, 3))
    
    # Cyan accent bar
    story.append(HRFlowable(width="100%", thickness=2.5, color=accent_blue, spaceBefore=2, spaceAfter=6))
    
    # Executive Positioning
    story.append(Paragraph("<b>CORE SPECIALIZATION & PHILOSOPHY</b>", section_head_style))
    story.append(Paragraph(
        "Builds autonomous agentic AI architectures, grounded RAG pipelines, and high-performance ML backends. "
        "Engineers deterministic safeguards, role-based controls, and vector reasoning engines to deliver production AI systems that decide and act reliably.",
        summary_style
    ))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cbd5e1'), spaceBefore=2, spaceAfter=4))
    
    # Experience
    story.append(Paragraph("<b>WORK EXPERIENCE</b>", section_head_style))
    
    t_exp1 = Table([
        [Paragraph("<b>Syncs Group</b> — AI/ML Intern", item_title_style), Paragraph("<b>2026</b>", item_date_style)]
    ], colWidths=[410, 138])
    t_exp1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_exp1)
    story.append(Paragraph("• Architected scalable machine learning microservices and high-throughput data extraction engines.", bullet_style))
    story.append(Paragraph("• Optimized multimodal and agentic pipelines for low-latency operational intelligence and structured outputs.", bullet_style))
    story.append(Spacer(1, 3))
    
    t_exp2 = Table([
        [Paragraph("<b>TeckyBot</b> — AI Intern", item_title_style), Paragraph("<b>Jan 2025 – Mar 2025</b>", item_date_style)]
    ], colWidths=[410, 138])
    t_exp2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_exp2)
    story.append(Paragraph("• Developed tabular predictive models and classification engines using scikit-learn with rigorous feature engineering.", bullet_style))
    story.append(Paragraph("• Implemented GenAI conversational workflows, prompt routing logic, and automated evaluation frameworks.", bullet_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cbd5e1'), spaceBefore=2, spaceAfter=4))
    
    # Projects
    story.append(Paragraph("<b>FEATURED SYSTEMS ARCHITECTURE</b>", section_head_style))
    
    # Project 1
    t_p1 = Table([
        [Paragraph("<b>Dynamic Pricing Intelligence Platform</b> [Autonomous Microservices]", item_title_style), Paragraph("<b>GitHub ↗</b>", item_date_style)]
    ], colWidths=[410, 138])
    t_p1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_p1)
    story.append(Paragraph("• <i>Stack: FastAPI, React Vite, Playwright Stealth, Scikit-learn (DBSCAN), OpenRouter Vision/LLM, PostgreSQL, Docker</i>", ParagraphStyle('SubStack1', parent=summary_style, fontSize=8, textColor=accent_blue)))
    story.append(Paragraph("• Built distributed scraping engine evading bot-detection across major e-commerce platforms.", bullet_style))
    story.append(Paragraph("• Clustered price points via DBSCAN to map competitive whitespace and synthesized executive reports with multimodal LLMs.", bullet_style))
    story.append(Spacer(1, 3))
    
    # Project 2
    t_p2 = Table([
        [Paragraph("<b>AI Clinical Trial Contradiction Engine</b> [Healthcare NLP / RAG]", item_title_style), Paragraph("<b>GitHub ↗</b>", item_date_style)]
    ], colWidths=[410, 138])
    t_p2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_p2)
    story.append(Paragraph("• <i>Stack: Clinical BERT, MPNet, FAISS, Mem0 Memory Layer, FastAPI, React, PostgreSQL</i>", ParagraphStyle('SubStack2', parent=summary_style, fontSize=8, textColor=accent_blue)))
    story.append(Paragraph("• Automated parsing of dense clinical trial protocols (PDFs) to match patient cohorts against inclusion/exclusion criteria.", bullet_style))
    story.append(Paragraph("• Engineered contradiction detector surfacing silent medical conflicts across longitudinal patient records.", bullet_style))
    story.append(Spacer(1, 3))
    
    # Project 3
    t_p3 = Table([
        [Paragraph("<b>Enterprise SOP & Policy Knowledge Assistant</b> [Production RAG]", item_title_style), Paragraph("<b>GitHub ↗</b>", item_date_style)]
    ], colWidths=[410, 138])
    t_p3.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_p3)
    story.append(Paragraph("• <i>Stack: Python, FastAPI, Streamlit, FAISS Vector Index, OpenAI GPT-3.5 Turbo, RBAC, CSV Logging</i>", ParagraphStyle('SubStack3', parent=summary_style, fontSize=8, textColor=accent_blue)))
    story.append(Paragraph("• Built decoupled enterprise assistant with strict role-based document partitioning and chunk-level similarity search.", bullet_style))
    story.append(Paragraph("• Implemented hallucination-proof strict context grounding with full audit logging for compliance.", bullet_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cbd5e1'), spaceBefore=2, spaceAfter=4))
    
    # Education
    story.append(Paragraph("<b>EDUCATION</b>", section_head_style))
    t_edu = Table([
        [Paragraph("<b>B.Tech: Computer Science & Engineering (AI & Data Science)</b> — Audisankara Inst. of Tech.", item_title_style), Paragraph("<b>2021 – 2025 | CGPA: 8.4</b>", item_date_style)],
        [Paragraph("<b>Higher Secondary (Class XII, MPC)</b> — B S R Junior College", item_title_style), Paragraph("<b>2019 – 2021</b>", item_date_style)],
        [Paragraph("<b>Secondary School Certificate (Class X)</b> — Zilla Parishad High School", item_title_style), Paragraph("<b>Passed 2019</b>", item_date_style)],
    ], colWidths=[410, 138])
    t_edu.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 1), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_edu)
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cbd5e1'), spaceBefore=2, spaceAfter=4))
    
    # Skills
    story.append(Paragraph("<b>TECHNICAL PROFICIENCY MATRIX</b>", section_head_style))
    s_data = [
        [Paragraph("<b>GenAI & LLMs:</b>", item_title_style), Paragraph("LangChain, LangGraph, RAG, Prompt Engineering, OpenAI, Azure OpenAI, Gemini", summary_style)],
        [Paragraph("<b>ML & NLP:</b>", item_title_style), Paragraph("PyTorch, TensorFlow, Keras, Hugging Face, BERT, Scikit-Learn, OpenCV", summary_style)],
        [Paragraph("<b>Backend & Data:</b>", item_title_style), Paragraph("Python, FastAPI, Django, FAISS, ChromaDB, PostgreSQL, Redis, Docker, REST APIs", summary_style)],
        [Paragraph("<b>Frontend & DevOps:</b>", item_title_style), Paragraph("React, Next.js, TypeScript, Streamlit, Git, Linux, Vercel, Render", summary_style)],
        [Paragraph("<i>Upskilling:</i>", item_title_style), Paragraph("<i>Multi-Agent Swarm Frameworks, Quantization, Low-Latency LLM Inference</i>", summary_style)]
    ]
    t_skills = Table(s_data, colWidths=[120, 428])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_skills)
    
    doc.build(story)
    print(f"Designed Resume generated at: {output_path}")

if __name__ == "__main__":
    os.makedirs("public/resumes", exist_ok=True)
    create_ats_resume("public/resumes/devendra_reddy_resume_ats.pdf")
    create_designed_resume("public/resumes/devendra_reddy_resume_designed.pdf")

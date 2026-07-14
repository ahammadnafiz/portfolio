const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "C++", "SQL", "Bash", "CUDA"] },
  { label: "ML / DL", items: ["PyTorch", "scikit-learn", "XGBoost", "CatBoost", "NumPy", "Pandas", "OpenCV", "Matplotlib"] },
  { label: "LLM & GenAI", items: ["LangChain", "LlamaIndex", "LangGraph", "HF Transformers", "CrewAI", "AutoGen", "vLLM", "OpenAI API", "Anthropic API"] },
  { label: "Agent Stack", items: ["ReAct", "Tool Use", "Function Calling", "Multi-Agent", "Supervisor / Swarm", "LLM Memory", "RAG", "LLM Eval"] },
  { label: "Fine-tuning", items: ["LoRA", "QLoRA", "PEFT", "SFT", "RLHF", "Instruction Tuning"] },
  { label: "Inference", items: ["vLLM", "ONNX", "TensorRT", "BentoML", "TorchServe", "Quantization"] },
  { label: "Backend / MLOps", items: ["FastAPI", "Docker", "Kubernetes", "MLflow", "W&B", "DVC", "GitHub Actions"] },
  { label: "Databases", items: ["PostgreSQL", "pgvector", "MySQL", "Chroma", "FAISS", "Pinecone", "Weaviate"] },
]

export function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full border-t border-border px-5 sm:px-8 lg:px-12 py-14 sm:py-16"
    >
      <div className="flex items-baseline gap-4 mb-8 sm:mb-10">
        <span className="label">( 02 )</span>
        <h2 className="font-display font-medium text-[clamp(2rem,6vw,4rem)] leading-none tracking-[-0.02em]">
          Skills
        </h2>
      </div>

      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {SKILL_GROUPS.map((g) => (
          <div
            key={g.label}
            className="grid grid-cols-3 sm:grid-cols-4 gap-4 py-4 border-t border-border items-baseline"
          >
            <dt className="col-span-1 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-muted-foreground">
              {g.label}
            </dt>
            <dd className="col-span-2 sm:col-span-3 flex flex-wrap gap-x-4 gap-y-2">
              {g.items.map((item) => (
                <span key={item} className="text-sm text-foreground/90">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 label">
        Domains — RAG · LLM Evaluation · AI Agents · NLP · Computer Vision · MLOps · Mechanistic Interpretability
      </p>
    </section>
  )
}

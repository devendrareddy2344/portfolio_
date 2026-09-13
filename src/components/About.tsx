import { ArrowUpRight, Check } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const About = () => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="about" className="section-shell py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#d7f36b]">01 / About</p>
          <h2 className="max-w-md text-3xl font-bold tracking-tight text-[#f1efe8] sm:text-5xl">
            Engineering useful intelligence into real products.
          </h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-[#d6dfd7] sm:text-xl">{personal.positioning}</p>
          <p className="mt-5 leading-relaxed text-[#9daaa1]">
            I work across the model and application boundary: designing retrieval and agent workflows, building dependable APIs, and connecting experiments to production constraints.
          </p>
          <div className="mt-8 grid gap-3 border-t border-[#dce8d9]/15 pt-6 sm:grid-cols-2">
            {["Agentic workflow design", "Grounded retrieval systems", "Applied ML and NLP", "Production Python services"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-[#d6dfd7]">
                <Check className="h-4 w-4 text-[#d7f36b]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
          <a href="#projects" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#d7f36b] hover:text-[#f1efe8]">
            See selected work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

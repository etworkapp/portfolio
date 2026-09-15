import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Workflow
} from 'lucide-react';

export const EngineeringStandards: React.FC = () => {
  const principles = [
    {
      icon: Cpu,
      title: "Clean Architecture & SOLID",
      badge: "Maintainability",
      description: "Decoupled component hierarchies, custom hooks for state isolation, and strictly typed TypeScript contracts for zero runtime regressions."
    },
    {
      icon: Zap,
      title: "Performance & Core Web Vitals",
      badge: "Optimization",
      description: "Instant First Contentful Paint (FCP), dynamic Vite bundle splitting, lazy-loaded routes, and optimized assets."
    },
    {
      icon: Workflow,
      title: "Automated CI/CD Pipelines",
      badge: "GitHub Actions",
      description: "Automated linting, type-checking, and one-click GitHub Pages deployment pipelines configured with reproducible dependencies."
    },
    {
      icon: ShieldCheck,
      title: "Defensive Coding & Security",
      badge: "Robustness",
      description: "Secure client/server boundaries, sanitized dynamic payloads, responsive error boundaries, and semantic HTML5 standards."
    }
  ];

  return (
    <section className="py-24 bg-black border-t border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Development Philosophy
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Engineering Standards &amp; Architecture
          </p>
          <p className="text-zinc-400 text-sm sm:text-base">
            Writing resilient, scalable code backed by proven software engineering patterns and modern DevOps workflows.
          </p>
        </div>

        {/* Grid of principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-950 rounded-2xl border border-zinc-800/90 p-6 flex flex-col justify-between hover:border-zinc-700 hover:shadow-2xl transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:scale-105 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-heading mb-2 group-hover:text-zinc-200 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-900 flex items-center gap-1.5 text-[11px] text-zinc-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Production Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-zinc-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer border border-zinc-700"
            id="btn-close-project-modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-zinc-400 mb-1 block">
              {project.category.toUpperCase()}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-zinc-200">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-900 text-zinc-300 border border-zinc-800"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Detailed description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Project Architecture
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Key Features
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Role info if available */}
          {project.role && (
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
              <span className="text-zinc-400">Developer Role:</span>
              <span className="font-semibold text-white">{project.role}</span>
            </div>
          )}

          {/* Implementation Note / Academic Artifact if available */}
          {project.implementationNote && (
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
              <span className="text-zinc-400">Environment &amp; Artifacts:</span>
              <span className="font-mono text-zinc-200">{project.implementationNote}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-800 transition-colors cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold border border-zinc-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repo</span>
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

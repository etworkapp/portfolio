import React from 'react';
import { ArrowUp, Github } from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
  onOpenDeployGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenDeployGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-zinc-800/80 py-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Note */}
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-white text-sm">
                Shubham
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-zinc-400 font-mono text-[11px]">Developer Portfolio</span>
            </div>
            <p className="text-[11px] text-zinc-500">
              Crafted with modern React, TypeScript, and Tailwind CSS.
            </p>
          </div>

          {/* Hosting Badge & Guide Link */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDeployGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors text-[11px] font-medium cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-white" />
              <span>GitHub Pages Ready</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
              title="Back to Top"
              id="btn-scroll-top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Shubham. All rights reserved.
          </div>
          <div className="flex items-center gap-4 font-medium">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#github-activity" className="hover:text-white transition-colors">Activity</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

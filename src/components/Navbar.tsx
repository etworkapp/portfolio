import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Menu, 
  X, 
  Github, 
  FileText, 
  SlidersHorizontal, 
  Terminal,
  Radio
} from 'lucide-react';
import { ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData;
  onOpenDeployGuide: () => void;
  onOpenResume: () => void;
  onOpenEditor: () => void;
  onOpenTerminal: () => void;
  onOpenAutoSync: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenDeployGuide,
  onOpenResume,
  onOpenEditor,
  onOpenTerminal,
  onOpenAutoSync,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Leadership', href: '#leadership-extracurriculars' },
    { name: 'LinkedIn Live', href: '#linkedin-live-sync' },
    { name: 'GitHub', href: '#github-activity' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050608]/85 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl py-2.5' 
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 group focus:outline-none"
            id="nav-logo-link"
          >
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shadow-sm group-hover:border-zinc-400 group-hover:scale-105 transition-all">
              <span className="font-heading font-extrabold text-white text-sm tracking-wider">
                {profile.name.slice(0, 1).toUpperCase() || 'S'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-white text-base tracking-tight flex items-center gap-1 group-hover:text-zinc-200 transition-colors">
                {profile.name.split(' ')[0]}
                <span className="text-zinc-400 font-mono text-sm">.dev</span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Active
                </span>
              </span>
              <span className="text-[11px] text-zinc-400 font-mono tracking-wide">
                @{profile.githubUsername}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/90 rounded-lg transition-colors"
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Live Auto-Sync Status Badge */}
            <button
              onClick={onOpenAutoSync}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 transition-colors cursor-pointer"
              id="btn-nav-autosync"
              title="Real-Time Automation Hub: Auto-Sync for LinkedIn & GitHub"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Sync</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>

            {/* Terminal Shell Button */}
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
              id="btn-nav-terminal"
              title="Launch interactive developer CLI shell"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>CLI</span>
            </button>

            {/* GitHub Pages Host Guide Badge */}
            <button
              onClick={onOpenDeployGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-zinc-500 transition-all cursor-pointer shadow-sm"
              id="btn-github-deploy-guide"
              title="GitHub Pages Hosting Guide"
            >
              <Github className="w-3.5 h-3.5 text-white" />
              <span>Host</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition-all cursor-pointer shadow-md hover:scale-105"
              id="btn-nav-resume"
            >
              <FileText className="w-3.5 h-3.5 text-black" />
              <span>Resume</span>
            </button>

            {/* Customize / Edit Profile */}
            <button
              onClick={onOpenEditor}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer"
              id="btn-nav-edit-profile"
              title="Edit profile details, skills, or projects"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenAutoSync}
              className="p-2 rounded-lg bg-zinc-900 text-white border border-zinc-750 text-xs font-medium flex items-center gap-1"
              id="btn-mobile-autosync"
              title="Auto-Sync Hub"
            >
              <Radio className="w-4 h-4 text-white animate-pulse" />
            </button>
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 text-xs font-medium flex items-center gap-1"
              id="btn-mobile-terminal"
              title="CLI Terminal"
            >
              <Terminal className="w-4 h-4 text-zinc-300" />
            </button>
            <button
              onClick={onOpenDeployGuide}
              className="p-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 text-xs font-medium flex items-center gap-1"
              id="btn-mobile-deploy-guide"
              title="GitHub Host Guide"
            >
              <Github className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none"
              aria-label="Toggle Navigation Menu"
              id="btn-toggle-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>


      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-zinc-900 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAutoSync();
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-semibold text-xs flex items-center justify-center gap-2"
            >
              <Radio className="w-4 h-4 text-white animate-pulse" />
              <span>Auto-Sync Hub (LinkedIn &amp; GitHub)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>View &amp; Print Resume</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDeployGuide();
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-medium text-xs flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Pages Deployment Guide</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

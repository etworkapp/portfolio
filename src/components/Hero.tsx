import React, { useState } from 'react';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  Terminal, 
  Sparkles,
  ExternalLink,
  Check,
  Copy,
  Code2,
  Cloud,
  Cpu,
  Layers,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  profile: ProfileData;
  onOpenDeployGuide: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onOpenDeployGuide,
  onOpenResume,
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'terminal' | 'metrics'>('code');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDeployCmd, setCopiedDeployCmd] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyDeploy = () => {
    navigator.clipboard.writeText('npm run build && gh-pages -d dist');
    setCopiedDeployCmd(true);
    setTimeout(() => setCopiedDeployCmd(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#050608] text-zinc-100 bg-grid-pattern">
      {/* Dynamic ambient radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-zinc-800/20 via-zinc-700/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-zinc-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-10">
          
          {/* Main Info */}
          <div className="w-full lg:max-w-2xl text-center lg:text-left space-y-6">
            
            {/* Real Status Badge & Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-white">Available for Opportunities</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300">Full Time &amp; Contract</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-[11px] text-zinc-400 font-mono">
                <MapPin className="w-3 h-3 text-zinc-400" />
                <span>Pune, India (Open to Remote)</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-zinc-400 font-mono font-medium">
                Web3 &amp; Cloud
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-tight">
                Hello, I'm <br className="hidden sm:inline" />
                <span className="text-white drop-shadow-sm">
                  {profile.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-zinc-200">
                {profile.role}
              </p>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {profile.tagline}
            </p>

            {/* Tech pills quick highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs font-mono text-zinc-300">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-200">
                Java &amp; Spring Boot
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-200">
                AWS EC2 / S3
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-200">
                React &amp; TypeScript
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-200">
                Solidity / Blockchain
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-200">
                Kafka &amp; SQL
              </span>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-sm transition-all shadow-lg hover:shadow-zinc-700/20 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                id="hero-btn-projects"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-semibold text-sm transition-all hover:border-zinc-500 cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0"
                id="hero-btn-resume"
              >
                <FileText className="w-4 h-4 text-zinc-300" />
                <span>Resume / CV</span>
              </button>

              <button
                onClick={onOpenDeployGuide}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 font-medium text-xs transition-all cursor-pointer"
                id="hero-btn-github-guide"
                title="How to host on GitHub Pages"
              >
                <Github className="w-4 h-4 text-zinc-300" />
                <span>GitHub Host Guide</span>
              </button>
            </div>

            {/* Social Links Bar & Quick Email Copy */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-zinc-400">
              <div className="flex items-center gap-2">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all hover:scale-105"
                  aria-label="GitHub Profile"
                  id="social-github-link"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all hover:scale-105"
                  aria-label="LinkedIn Profile"
                  id="social-linkedin-link"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all hover:scale-105"
                  aria-label="Send Email"
                  id="social-email-link"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Fast Copy Email Badge */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-mono text-[11px]">Copied: {profile.email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="font-mono text-[11px]">{profile.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Visual Tech Card - Interactive Real Engineering Dashboard */}
          <div className="w-full lg:w-auto flex-1 max-w-lg">
            <div className="relative rounded-2xl bg-zinc-950/90 border border-zinc-800 shadow-2xl p-5 sm:p-6 backdrop-blur-xl top-glow-border">
              
              {/* Terminal Title Bar with Interactive Tabs */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/90">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                        activeTab === 'code'
                          ? 'bg-zinc-800 text-white font-semibold'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      profile.ts
                    </button>
                    <button
                      onClick={() => setActiveTab('terminal')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                        activeTab === 'terminal'
                          ? 'bg-zinc-800 text-white font-semibold'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      bash
                    </button>
                    <button
                      onClick={() => setActiveTab('metrics')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                        activeTab === 'metrics'
                          ? 'bg-zinc-800 text-white font-semibold'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      telemetry.json
                    </button>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                  v2.4 Active
                </span>
              </div>

              {/* Tab 1: Code Snippet */}
              {activeTab === 'code' && (
                <div className="space-y-1.5 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto min-h-[190px]">
                  <div>
                    <span className="text-purple-400">interface</span>{' '}
                    <span className="text-yellow-200">EngineerProfile</span> &#123;
                  </div>
                  <div className="pl-4 text-zinc-400">
                    name: <span className="text-emerald-300">"{profile.name}"</span>;
                  </div>
                  <div className="pl-4 text-zinc-400">
                    degree: <span className="text-emerald-300">"B.E. Computer Engineering (SPPU)"</span>;
                  </div>
                  <div className="pl-4 text-zinc-400">
                    cgpa: <span className="text-blue-300">8.48</span>; <span className="text-zinc-500">// First Class with Distinction</span>
                  </div>
                  <div className="pl-4 text-zinc-400">
                    coreTech: [
                    <span className="text-emerald-300">"Java"</span>,{' '}
                    <span className="text-emerald-300">"AWS"</span>,{' '}
                    <span className="text-emerald-300">"Solidity"</span>,{' '}
                    <span className="text-emerald-300">"React"</span>];
                  </div>
                  <div className="pl-4 text-zinc-400">
                    experience: <span className="text-emerald-300">"Tech Mahindra"</span>;
                  </div>
                  <div className="pl-4 text-zinc-400">
                    status: <span className="text-purple-400">ReadyForDeploy</span>;
                  </div>
                  <div>&#125;</div>
                </div>
              )}

              {/* Tab 2: Terminal Shell Preview */}
              {activeTab === 'terminal' && (
                <div className="space-y-2 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto min-h-[190px] bg-black/40 p-3 rounded-lg border border-zinc-900">
                  <div className="text-zinc-500">
                    $ <span className="text-emerald-400">curl</span> -s https://etworkapp.github.io/healthz
                  </div>
                  <div className="text-zinc-300 text-[11px] leading-snug">
                    &#123;<br />
                    &nbsp;&nbsp;"status": <span className="text-emerald-400">"healthy"</span>,<br />
                    &nbsp;&nbsp;"aws_ec2_deployment": <span className="text-emerald-400">"ACTIVE"</span>,<br />
                    &nbsp;&nbsp;"smart_contract_network": <span className="text-emerald-400">"Ganache / Ethereum"</span>,<br />
                    &nbsp;&nbsp;"uptime": <span className="text-blue-400">"99.98%"</span><br />
                    &#125;
                  </div>
                  <div className="pt-1 text-zinc-500 flex items-center gap-1.5">
                    $ <span className="text-zinc-300">git status</span>
                    <span className="text-emerald-400">On branch main, working tree clean</span>
                  </div>
                </div>
              )}

              {/* Tab 3: Telemetry Metrics */}
              {activeTab === 'metrics' && (
                <div className="space-y-2 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto min-h-[190px] bg-black/40 p-3 rounded-lg border border-zinc-900">
                  <div className="text-zinc-400 font-semibold mb-1">// System Verification Logs:</div>
                  <div className="flex justify-between text-zinc-300 text-xs py-0.5 border-b border-zinc-900">
                    <span className="text-zinc-500">Academic Score:</span>
                    <span className="text-emerald-400 font-bold">8.48 CGPA (Distinction)</span>
                  </div>
                  <div className="flex justify-between text-zinc-300 text-xs py-0.5 border-b border-zinc-900">
                    <span className="text-zinc-500">Industry Experience:</span>
                    <span className="text-zinc-200">Tech Mahindra</span>
                  </div>
                  <div className="flex justify-between text-zinc-300 text-xs py-0.5 border-b border-zinc-900">
                    <span className="text-zinc-500">Languages:</span>
                    <span className="text-zinc-200">English, Hindi, Marathi, French</span>
                  </div>
                  <div className="flex justify-between text-zinc-300 text-xs py-0.5">
                    <span className="text-zinc-500">Hosting Target:</span>
                    <span className="text-white font-bold">GitHub Pages + AWS EC2</span>
                  </div>
                </div>
              )}

              {/* GitHub Deploy Command Snippet */}
              <div className="mt-4 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5">
                  <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                    <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                    Publish to GitHub Pages
                  </span>
                  <button
                    onClick={handleCopyDeploy}
                    className="inline-flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white cursor-pointer"
                  >
                    {copiedDeployCmd ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-black/90 p-2 rounded text-zinc-200 font-mono text-xs select-all border border-zinc-800/80 flex items-center justify-between">
                  <span>npm run build &amp;&amp; gh-pages -d dist</span>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-lg font-bold font-heading text-white">{profile.yearsOfExperience}</div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Experience</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-lg font-bold font-heading text-white">8.48</div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">B.E. CGPA</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-lg font-bold font-heading text-white">100%</div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Verified</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


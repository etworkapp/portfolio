import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Sparkles } from 'lucide-react';
import { PortfolioContent } from '../types';

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioContent;
  onOpenDeployGuide: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const DeveloperTerminal: React.FC<DeveloperTerminalProps> = ({
  isOpen,
  onClose,
  data,
  onOpenDeployGuide,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-white font-bold">
            Welcome to {data.profile.name}'s Interactive Developer Console v2.5.0
          </p>
          <p className="text-zinc-400 text-xs">
            Type <span className="text-white font-semibold">'help'</span> to inspect available developer commands or <span className="text-white font-semibold">'github'</span> for deployment details.
          </p>
        </div>
      ),
    },
  ]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [executedList, setExecutedList] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    setExecutedList(prev => [...prev, trimmed]);
    setCommandIndex(-1);

    let output: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-zinc-400">Available commands in this shell:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-mono">
              <div><span className="text-white font-semibold">about</span> - Summary and technical bio</div>
              <div><span className="text-white font-semibold">skills</span> - List technical proficiencies</div>
              <div><span className="text-white font-semibold">projects</span> - View featured projects</div>
              <div><span className="text-white font-semibold">leadership</span> - Cisco NetAcad, hackathons &amp; contests</div>
              <div><span className="text-white font-semibold">extracurricular</span> - Certifications, languages &amp; NGO volunteering</div>
              <div><span className="text-white font-semibold">interests</span> - Polyglot, finance &amp; entrepreneurship</div>
              <div><span className="text-white font-semibold">linkedin</span> - View live LinkedIn auto-sync feed</div>
              <div><span className="text-white font-semibold">sync</span> - Force automated sync cycle</div>
              <div><span className="text-white font-semibold">experience</span> - Work &amp; education history</div>
              <div><span className="text-white font-semibold">contact</span> - Direct channels to get in touch</div>
              <div><span className="text-white font-semibold">github</span> - GitHub Pages deployment specs</div>
              <div><span className="text-white font-semibold">sudo hire</span> - Direct hiring action</div>
              <div><span className="text-white font-semibold">clear</span> - Clear terminal buffer</div>
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-2 text-xs text-zinc-300">
            <p className="text-white font-semibold">{data.profile.name} - {data.profile.role}</p>
            <p className="text-zinc-300 leading-relaxed">{data.profile.bio}</p>
            <p className="text-zinc-400">Location: <span className="text-white">{data.profile.location}</span> | Exp: <span className="text-white font-mono">{data.profile.yearsOfExperience}</span></p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-3 text-xs">
            <p className="text-white font-bold">Skills Matrix:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {data.skills.map((s, i) => (
                <div key={i} className="flex justify-between bg-zinc-900 p-1.5 rounded border border-zinc-800">
                  <span className="text-zinc-200">{s.name}</span>
                  <span className="text-white font-mono font-semibold">{s.level}%</span>
                </div>
              ))}
            </div>
            {data.softSkills && (
              <div>
                <p className="text-zinc-400 font-medium text-[11px]">Soft Skills &amp; Attributes:</p>
                <p className="text-zinc-300">{data.softSkills.join(', ')}</p>
              </div>
            )}
            {data.languages && (
              <div>
                <p className="text-zinc-400 font-medium text-[11px]">Languages:</p>
                <p className="text-zinc-300">{data.languages.join(', ')}</p>
              </div>
            )}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-white font-bold">Featured Applications:</p>
            <div className="space-y-1.5">
              {data.projects.map((p, idx) => (
                <div key={idx} className="border-l-2 border-zinc-700 pl-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{p.title}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">[{p.category}]</span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-3 text-xs">
            <p className="text-white font-bold">Career &amp; Work Experience:</p>
            {data.experiences.map((exp, idx) => (
              <div key={idx} className="bg-zinc-900 p-2 rounded border border-zinc-800 space-y-1">
                <div className="flex justify-between text-white font-medium">
                  <span>{exp.role} @ {exp.company}</span>
                  <span className="text-zinc-400 font-mono text-[11px]">{exp.period}</span>
                </div>
                <p className="text-zinc-400 text-[11px]">{exp.description}</p>
              </div>
            ))}
            <p className="text-white font-bold pt-1">Academic Education:</p>
            {data.education.map((edu, idx) => (
              <div key={idx} className="bg-zinc-900 p-2 rounded border border-zinc-800 space-y-1">
                <div className="flex justify-between text-white font-medium">
                  <span>{edu.degree}</span>
                  <span className="text-zinc-400 font-mono text-[11px]">{edu.period}</span>
                </div>
                <div className="text-zinc-400 text-[11px] flex justify-between items-baseline">
                  <span>{edu.institution}</span>
                  {edu.score && <span className="text-white font-semibold font-mono">{edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'leadership':
        output = (
          <div className="space-y-2 text-xs text-zinc-300">
            <p className="text-white font-bold">Leadership &amp; Hackathons:</p>
            <div className="space-y-1.5">
              <div className="border-l-2 border-white pl-2">
                <p className="text-white font-semibold">Cisco NetAcad – Activity Head</p>
                <p className="text-zinc-400 text-[11px]">Established club, conducted networking boot camps with 500+ student attendees.</p>
              </div>
              <div className="border-l-2 border-zinc-750 pl-2">
                <p className="text-white font-semibold">Oracle Hacks! – Hedera Hashgraph</p>
                <p className="text-zinc-400 text-[11px]">Engineered decentralized app integrations &amp; smart contracts, advancing through selection rounds.</p>
              </div>
              <div className="border-l-2 border-zinc-750 pl-2">
                <p className="text-white font-semibold">Codeliedoscope 2023 &amp; BizQuezt (AI/ML)</p>
                <p className="text-zinc-400 text-[11px]">Contestant in system engineering, AI, Machine Learning, and algorithm optimization.</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'extracurricular':
        output = (
          <div className="space-y-2 text-xs text-zinc-300">
            <p className="text-white font-bold">Certifications &amp; Social Impact:</p>
            <div className="space-y-1.5">
              <div>• <span className="text-white font-semibold">French Diploma:</span> Savitribai Phule Pune University (SPPU) multilingual distinction.</div>
              <div>• <span className="text-white font-semibold">Cisco Networking Academy:</span> Networking &amp; technical activities certification.</div>
              <div>• <span className="text-white font-semibold">Nature Lovers (Lions Club Pune):</span> Led NEP environmental workshops (rainwater harvesting, tree plantation).</div>
            </div>
          </div>
        );
        break;

      case 'interests':
        output = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-white font-bold">Intellectual Pursuits &amp; Passions:</p>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-750 text-zinc-200">Foreign Languages</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-750 text-zinc-200">Entrepreneurship</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-750 text-zinc-200">Quantitative Finance</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-750 text-zinc-200">Deep Tech Systems</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-750 text-zinc-200">Software Development</span>
            </div>
          </div>
        );
        break;

      case 'linkedin':
        output = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-white font-bold flex items-center gap-1.5">
              <span>LinkedIn Automated Mirror:</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-white">LIVE SYNC ACTIVE</span>
            </p>
            <p className="text-zinc-300">Profile: <a href="https://www.linkedin.com/in/shubham-w-02b8b2436/" target="_blank" rel="noreferrer" className="text-white underline">linkedin.com/in/shubham-w-02b8b2436</a></p>
            <p className="text-zinc-400 text-[11px]">Latest posts, career headline, licenses & certifications are mirrored dynamically onto the portfolio.</p>
          </div>
        );
        break;

      case 'sync':
        output = (
          <div className="space-y-1 text-xs text-zinc-300 font-mono">
            <p className="text-white font-bold">Initiating auto-sync cycle...</p>
            <p className="text-zinc-400">&gt; Polling GitHub API for @etworkapp...</p>
            <p className="text-zinc-400">&gt; Polling LinkedIn stream for @shubham-w-02b8b2436...</p>
            <p className="text-white">&gt; Status: 200 OK. Continuous automation active (interval: 60s).</p>
          </div>
        );
        break;

      case 'github':
        output = (
          <div className="space-y-2 text-xs text-zinc-300">
            <p className="text-white font-bold">GitHub Pages Deployment Workflow:</p>
            <p className="text-zinc-400 leading-relaxed">
              1. Relative URL resolution is configured: <code className="text-white font-mono">base: './'</code> in vite.config.ts.<br />
              2. Automated CI/CD pipeline is in <code className="text-white font-mono">.github/workflows/deploy.yml</code>.<br />
              3. Deploy via CLI: <code className="text-white font-mono">npm run deploy</code>.
            </p>
            <button
              onClick={onOpenDeployGuide}
              className="text-xs font-semibold text-white hover:underline cursor-pointer"
            >
              Open Interactive GitHub Hosting Guide &rarr;
            </button>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-white font-bold">Direct Channels:</p>
            <p>Email: <a href={`mailto:${data.profile.email}`} className="text-white hover:underline font-mono">{data.profile.email}</a></p>
            <p>GitHub: <a href={data.profile.githubUrl} target="_blank" rel="noreferrer" className="text-white hover:underline font-mono">{data.profile.githubUrl}</a></p>
            <p>LinkedIn: <a href={data.profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-white hover:underline font-mono">{data.profile.linkedinUrl}</a></p>
          </div>
        );
        break;

      case 'sudo hire':
      case 'hire':
        output = (
          <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-xl space-y-1.5 text-xs">
            <p className="text-white font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-white" />
              Permission Granted! Access level: PRIORITY_CANDIDATE
            </p>
            <p className="text-zinc-300">
              Thank you for considering {data.profile.name}! Opening mail client to initiate recruitment discussion...
            </p>
            <a
              href={`mailto:${data.profile.email}?subject=Job Opportunity for ${encodeURIComponent(data.profile.name)}&body=Hi ${data.profile.name}, we came across your portfolio and would love to discuss an engineering role with our team.`}
              className="inline-block mt-1 px-3 py-1 bg-white hover:bg-zinc-200 text-black font-bold rounded text-xs"
            >
              Launch Direct Interview Email &rarr;
            </a>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <div className="text-xs text-zinc-400">
            Command not recognized: '<span className="text-white">{trimmed}</span>'. Type <span className="text-white font-semibold">'help'</span> to view recognized commands.
          </div>
        );
        break;
    }

    setHistory(prev => [...prev, { command: trimmed, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (executedList.length > 0) {
        const nextIdx = commandIndex === -1 ? executedList.length - 1 : Math.max(0, commandIndex - 1);
        setCommandIndex(nextIdx);
        setInputVal(executedList[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex !== -1) {
        const nextIdx = commandIndex + 1;
        if (nextIdx >= executedList.length) {
          setCommandIndex(-1);
          setInputVal('');
        } else {
          setCommandIndex(nextIdx);
          setInputVal(executedList[nextIdx]);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-black border border-zinc-800 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col h-[560px] max-h-[90vh] overflow-hidden font-mono"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="p-3.5 bg-zinc-950 border-b border-zinc-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-zinc-600 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-zinc-600" />
              <span className="w-3 h-3 rounded-full bg-zinc-500" />
            </div>
            <div className="ml-3 flex items-center gap-1.5 text-xs text-zinc-400 font-sans font-medium">
              <Terminal className="w-3.5 h-3.5 text-white" />
              <span>shubham@portfolio:~</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-white font-semibold">shubham@portfolio</span>
                <span className="text-zinc-600">:</span>
                <span className="text-zinc-400 font-medium">~</span>
                <span className="text-zinc-500">$</span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
              <div className="pl-3 border-l border-zinc-800">{item.output}</div>
            </div>
          ))}

          {/* Active Prompt Input */}
          <div className="flex items-center gap-2 text-zinc-400 pt-1">
            <span className="text-white font-semibold">shubham@portfolio</span>
            <span className="text-zinc-600">:</span>
            <span className="text-zinc-400 font-medium">~</span>
            <span className="text-zinc-500">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none font-mono text-xs caret-white"
              placeholder="Type command ('help', 'skills', 'projects', 'github')..."
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Terminal Footer Quick Bar */}
        <div className="p-2.5 bg-zinc-950 border-t border-zinc-850 flex items-center justify-between text-[11px] text-zinc-500 font-sans">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span>Quick:</span>
            {['help', 'skills', 'projects', 'github', 'sudo hire', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(cmd);
                }}
                className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-white hover:text-black text-zinc-300 font-mono transition-colors text-[10px] cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
          <span className="hidden sm:inline text-zinc-500 font-mono text-[10px]">
            press 'Enter' to execute
          </span>
        </div>
      </div>
    </div>
  );
};

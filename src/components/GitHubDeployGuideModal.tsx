import React, { useState } from 'react';
import { 
  X, 
  Github, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Rocket, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Code,
  ArrowRight,
  Zap,
  Globe
} from 'lucide-react';

interface GitHubDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  githubUsername?: string;
}

export const GitHubDeployGuideModal: React.FC<GitHubDeployGuideModalProps> = ({
  isOpen,
  onClose,
  githubUsername = "etworkapp"
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [repoName, setRepoName] = useState('portfolio');
  const [usernameInput, setUsernameInput] = useState(githubUsername || 'etworkapp');
  const [activeTab, setActiveTab] = useState<'actions' | 'ghpages' | 'troubleshooting'>('actions');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const calculatedLiveUrl = `https://${usernameInput || 'username'}.github.io/${repoName || 'portfolio'}/`;

  const gitPushCommands = `# 1. Initialize Git and commit changes
git init
git add .
git commit -m "feat: initial developer portfolio release"

# 2. Set default branch to main
git branch -M main

# 3. Link your remote GitHub repository
git remote add origin https://github.com/${usernameInput || '<your-username>'}/${repoName || 'portfolio'}.git

# 4. Push code to GitHub
git push -u origin main`;

  const ghCliCommands = `# Or use the GitHub CLI to create & push in one command:
gh repo create ${repoName || 'portfolio'} --public --source=. --remote=origin --push`;

  const ghPagesCommands = `# Deploy directly from terminal using gh-pages:
npm run deploy

# This command automatically:
# 1. Runs "npm run build" to produce production static bundle in /dist
# 2. Uploads the bundle directly to the "gh-pages" branch on GitHub!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-zinc-950 border border-zinc-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in Monochrome */}
        <div className="p-5 sm:p-6 bg-black border-b border-zinc-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shrink-0">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                  GitHub Pages Hosting Guide
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-900 text-white border border-zinc-700 font-semibold">
                  Pre-Configured
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Complete walkthrough to deploy this React portfolio to GitHub Pages for free with zero configuration errors.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            id="btn-close-deploy-guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live URL Simulator Bar */}
        <div className="bg-zinc-900/60 px-6 py-3 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-400 font-medium">Username:</span>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="bg-black border border-zinc-700 rounded-lg px-2.5 py-1 text-zinc-200 font-mono text-xs w-36 focus:outline-none focus:border-zinc-400"
                placeholder="github-username"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-400 font-medium">Repo:</span>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className="bg-black border border-zinc-700 rounded-lg px-2.5 py-1 text-zinc-200 font-mono text-xs w-28 focus:outline-none focus:border-zinc-400"
                placeholder="portfolio"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-zinc-500">Your Live URL:</span>
            <a 
              href={calculatedLiveUrl} 
              target="_blank" 
              rel="noreferrer"
              className="font-mono text-white underline flex items-center gap-1 font-medium"
            >
              {calculatedLiveUrl}
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </div>
        </div>

        {/* Architecture Pipeline Banner */}
        <div className="px-6 py-2.5 bg-zinc-900/40 border-b border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1 text-white font-mono font-medium">
              <Code className="w-3.5 h-3.5" /> React 19 Source
            </span>
            <ArrowRight className="w-3 h-3 text-zinc-600" />
            <span className="flex items-center gap-1 text-zinc-300 font-mono font-medium">
              <Github className="w-3.5 h-3.5" /> Git Push
            </span>
            <ArrowRight className="w-3 h-3 text-zinc-600" />
            <span className="flex items-center gap-1 text-white font-mono font-medium">
              <Zap className="w-3.5 h-3.5" /> GitHub Actions
            </span>
            <ArrowRight className="w-3 h-3 text-zinc-600" />
            <span className="flex items-center gap-1 text-zinc-300 font-mono font-medium">
              <Globe className="w-3.5 h-3.5" /> Live on GitHub Pages
            </span>
          </div>
          <span className="text-[10px] text-white font-mono font-semibold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700 shrink-0 ml-2">
            base: './'
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-zinc-800 flex gap-4">
          <button
            onClick={() => setActiveTab('actions')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'actions'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>Method 1: GitHub Actions (Automated)</span>
          </button>
          <button
            onClick={() => setActiveTab('ghpages')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'ghpages'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Method 2: CLI `npm run deploy`</span>
          </button>
          <button
            onClick={() => setActiveTab('troubleshooting')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'troubleshooting'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>404 Troubleshooting</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-zinc-300 text-xs sm:text-sm">
          {activeTab === 'actions' && (
            <div className="space-y-5">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">
                    CI/CD Workflow Pre-configured
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    This project already includes <code className="text-white font-mono">.github/workflows/deploy.yml</code>. Whenever you push to the <code className="text-white font-mono">main</code> branch, GitHub automatically installs dependencies, builds the Vite application, and publishes the static artifacts to GitHub Pages.
                  </p>
                </div>
              </div>

              {/* Step by step */}
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">
                      Export Codebase from AI Studio
                    </h5>
                    <p className="text-xs text-zinc-400 mt-1">
                      Click the top-right Settings/Export menu in AI Studio and select <strong>"Export to GitHub"</strong> or download as a <strong>ZIP file</strong> and extract it on your local machine.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">
                      Create a New GitHub Repository
                    </h5>
                    <p className="text-xs text-zinc-400 mt-1">
                      Navigate to <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-white underline">github.com/new</a> and create a public repository named <code className="text-zinc-200 font-mono">{repoName}</code>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-white text-sm">
                      Initialize Git &amp; Push
                    </h5>
                    <p className="text-xs text-zinc-400 mt-1 mb-2">
                      Run these commands in your project root terminal:
                    </p>

                    <div className="relative bg-black rounded-xl border border-zinc-800 p-3 font-mono text-xs text-zinc-300">
                      <pre className="overflow-x-auto">{gitPushCommands}</pre>
                      <button
                        onClick={() => copyToClipboard(gitPushCommands, 'git-push')}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700"
                        title="Copy commands"
                      >
                        {copiedKey === 'git-push' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">
                      Enable GitHub Pages in Settings
                    </h5>
                    <div className="text-xs text-zinc-400 mt-1 space-y-1.5">
                      <p>1. Open your repository on GitHub: <strong>Settings &rarr; Pages</strong></p>
                      <p>2. Under <strong>"Build and deployment" &gt; "Source"</strong>, select <strong>"GitHub Actions"</strong>.</p>
                      <p>3. Go to the <strong>Actions</strong> tab to watch the workflow build and deploy!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ghpages' && (
            <div className="space-y-5">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex items-start gap-3">
                <Terminal className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">
                    Direct Terminal Deployment via `gh-pages`
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Prefer deploying directly from your machine with a single terminal command? The <code className="text-white font-mono">gh-pages</code> package is already configured in <code className="text-white font-mono">package.json</code>.
                  </p>
                </div>
              </div>

              <div className="relative bg-black rounded-xl border border-zinc-800 p-3.5 font-mono text-xs text-zinc-300">
                <pre className="overflow-x-auto">{ghPagesCommands}</pre>
                <button
                  onClick={() => copyToClipboard(ghPagesCommands, 'gh-pages')}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700"
                  title="Copy command"
                >
                  {copiedKey === 'gh-pages' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-400 space-y-2">
                <h5 className="font-bold text-white">Repository Settings for gh-pages:</h5>
                <p>1. Open your repo &rarr; <strong>Settings &rarr; Pages</strong></p>
                <p>2. Set Source to <strong>"Deploy from a branch"</strong></p>
                <p>3. Set Branch to <code className="text-white font-mono">gh-pages</code> and Folder to <code className="text-white font-mono">/ (root)</code></p>
              </div>
            </div>
          )}

          {activeTab === 'troubleshooting' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-700 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <AlertCircle className="w-4 h-4 text-white shrink-0" />
                  <span>Fixing GitHub Pages "404 Not Found" Error</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  If visiting your GitHub Pages URL displays a 404 screen, follow these 3 quick checks:
                </p>
                <ol className="list-decimal list-inside text-xs text-zinc-400 space-y-2 mt-2">
                  <li>
                    <strong className="text-white">Verify Source Setting:</strong> Go to <code className="text-zinc-200">Settings &rarr; Pages</code> in your repo. If using the GitHub Actions workflow, ensure <strong>Source</strong> is set to <strong>"GitHub Actions"</strong> (not "None").
                  </li>
                  <li>
                    <strong className="text-white">Check Workflow Run:</strong> Go to the <strong>Actions</strong> tab. Confirm the "Deploy to GitHub Pages" workflow has completed with a green checkmark.
                  </li>
                  <li>
                    <strong className="text-white">Enable Workflow Permissions:</strong> Go to <code className="text-zinc-200">Settings &rarr; Actions &rarr; General</code> &rarr; scroll down to <strong>"Workflow permissions"</strong> &rarr; select <strong>"Read and write permissions"</strong>.
                  </li>
                  <li>
                    <strong className="text-white">Asset Paths:</strong> Vite is already configured with <code className="text-white font-mono">base: './'</code> so assets will never break regardless of whether the repo name is root or custom.
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black border-t border-zinc-800 flex items-center justify-between text-xs">
          <span className="text-zinc-400">
            Need help? Check repository <code className="text-white font-mono">README.md</code> for instructions.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

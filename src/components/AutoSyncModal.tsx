import React, { useState } from 'react';
import { 
  X, 
  RefreshCw, 
  Radio, 
  CheckCircle2, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Sliders, 
  Terminal, 
  Sparkles, 
  Send,
  Zap,
  Globe,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { SyncLogEntry } from '../types';

interface AutoSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEnabled: boolean;
  intervalSec: number;
  onToggleEnabled: (enabled: boolean) => void;
  onChangeInterval: (sec: number) => void;
  onForceSync: () => Promise<void>;
  onTriggerTestPost: (content: string) => void;
  logs: SyncLogEntry[];
  isSyncing: boolean;
}

export const AutoSyncModal: React.FC<AutoSyncModalProps> = ({
  isOpen,
  onClose,
  isEnabled,
  intervalSec,
  onToggleEnabled,
  onChangeInterval,
  onForceSync,
  onTriggerTestPost,
  logs,
  isSyncing
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testContent, setTestContent] = useState('');
  const [activeTab, setActiveTab] = useState<'control' | 'webhooks' | 'logs'>('control');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testContent.trim()) return;
    onTriggerTestPost(testContent.trim());
    setTestContent('');
  };

  const sampleWebhookPayload = `{
  "event": "linkedin.post_created",
  "author": "Shubham",
  "profile_id": "shubham-w-02b8b2436",
  "timestamp": "${new Date().toISOString()}",
  "content": "🚀 Shipped new version with automated real-time state sync!",
  "tags": ["#React", "#Automation", "#Engineering"]
}`;

  const zapierRecipeInstructions = `# Automatic LinkedIn-to-Portfolio Sync via Zapier / Make:
1. Trigger App: "LinkedIn" -> Event: "New Post By You"
2. Action App: "Webhooks by Zapier" (POST)
3. URL: https://etworkapp.github.io/portfolio/api/sync/linkedin (or trigger GitHub repository_dispatch)
4. Payload: Send post content and timestamp.
Result: Your portfolio updates automatically the second you publish on LinkedIn!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-zinc-950 border border-zinc-800 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-black border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
              <Radio className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                  Auto-Sync &amp; Real-Time Automation Hub
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  isEnabled ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {isEnabled ? 'Live Engine Active' : 'Paused'}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Automated continuous sync for LinkedIn (@shubham-w-02b8b2436) and GitHub (@etworkapp).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-zinc-800 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('control')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'control'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Sync Controls</span>
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'webhooks'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>LinkedIn Webhook &amp; Zapier</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'logs'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Live Audit Logs ({logs.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-zinc-300 text-xs sm:text-sm">
          
          {activeTab === 'control' && (
            <div className="space-y-6">
              
              {/* Master Engine Toggle */}
              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Automated Background Engine</span>
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  </div>
                  <p className="text-xs text-zinc-400">
                    Continuously checks for updates and immediately reflects changes on your portfolio.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggleEnabled(!isEnabled)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isEnabled
                        ? 'bg-white text-black hover:bg-zinc-200'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {isEnabled ? '● Active (Enabled)' : '○ Paused'}
                  </button>

                  <button
                    onClick={onForceSync}
                    disabled={isSyncing}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-white border border-zinc-700 transition-colors cursor-pointer disabled:opacity-50"
                    title="Force sync cycle immediately"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Polling Interval Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 font-heading">
                  Continuous Polling Frequency
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Real-time (15s)', sec: 15 },
                    { label: 'Fast (30s)', sec: 30 },
                    { label: 'Standard (60s)', sec: 60 },
                    { label: 'Relaxed (5m)', sec: 300 }
                  ].map((opt) => (
                    <button
                      key={opt.sec}
                      onClick={() => onChangeInterval(opt.sec)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        intervalSec === opt.sec
                          ? 'bg-white text-black border-white font-bold shadow-sm'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Connected Channels Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* LinkedIn Card */}
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-bold text-xs">
                      <Linkedin className="w-4 h-4 text-white" />
                      <span>LinkedIn Sync Channel</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <p className="text-xs text-zinc-400">
                    Channel: <span className="text-white font-mono">shubham-w-02b8b2436</span>
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    Mirrors: Posts, career headlines, milestones, licenses &amp; certifications.
                  </p>
                </div>

                {/* GitHub Card */}
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-bold text-xs">
                      <Github className="w-4 h-4 text-white" />
                      <span>GitHub Sync Channel</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <p className="text-xs text-zinc-400">
                    Channel: <span className="text-white font-mono">etworkapp</span>
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    Mirrors: Public repositories, stars, commit events, and 52-week contribution matrix.
                  </p>
                </div>

              </div>

              {/* Instant Test Simulator */}
              <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs font-heading">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Instant LinkedIn Update Test (Zero Delay)</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Simulate an instant post published to LinkedIn. When submitted, it updates the live portfolio immediately:
                </p>
                <form onSubmit={handleSendTest} className="flex gap-2">
                  <input
                    type="text"
                    value={testContent}
                    onChange={(e) => setTestContent(e.target.value)}
                    placeholder="Enter update content (e.g. 'Just launched our new microservice architecture!')..."
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
                  />
                  <button
                    type="submit"
                    disabled={!testContent.trim()}
                    className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Update</span>
                  </button>
                </form>
              </div>

            </div>
          )}

          {activeTab === 'webhooks' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <Zap className="w-4 h-4 text-white" />
                  <span>Zapier / Make / IFTTT Automated Ingestion</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Connect your personal LinkedIn account directly to your portfolio. Whenever you post or change your headline on LinkedIn, your automation webhook fires and pushes the update automatically.
                </p>
              </div>

              <div className="relative bg-black rounded-xl border border-zinc-800 p-3.5 font-mono text-xs text-zinc-300">
                <pre className="overflow-x-auto whitespace-pre-wrap">{zapierRecipeInstructions}</pre>
                <button
                  onClick={() => copyToClipboard(zapierRecipeInstructions, 'zapier')}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700"
                  title="Copy instructions"
                >
                  {copiedKey === 'zapier' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                  Standard Ingestion JSON Format
                </span>
                <div className="relative bg-black rounded-xl border border-zinc-800 p-3 font-mono text-xs text-zinc-300">
                  <pre className="overflow-x-auto">{sampleWebhookPayload}</pre>
                  <button
                    onClick={() => copyToClipboard(sampleWebhookPayload, 'payload')}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700"
                  >
                    {copiedKey === 'payload' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Real-Time Sync Audit Stream</span>
                <span>{logs.length} Recorded Events</span>
              </div>

              <div className="bg-black border border-zinc-800 rounded-xl p-3 font-mono text-xs max-h-[350px] overflow-y-auto space-y-1.5">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-zinc-500 shrink-0">[{log.timestamp}]</span>
                    <span className={`uppercase text-[10px] px-1.5 py-0.2 rounded font-bold shrink-0 ${
                      log.source === 'linkedin' 
                        ? 'bg-zinc-900 text-zinc-200 border border-zinc-700'
                        : log.source === 'github'
                        ? 'bg-zinc-900 text-white border border-zinc-700'
                        : 'bg-zinc-900 text-zinc-400'
                    }`}>
                      {log.source}
                    </span>
                    <span className={`flex-1 ${
                      log.type === 'success' ? 'text-zinc-200' : log.type === 'warn' ? 'text-zinc-400' : 'text-zinc-400'
                    }`}>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-black border-t border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Zero-configuration continuous sync active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

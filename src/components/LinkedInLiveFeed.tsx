import React, { useState } from 'react';
import { 
  Linkedin, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Award, 
  Radio, 
  Send,
  SlidersHorizontal,
  Briefcase
} from 'lucide-react';
import { LinkedInProfileSync, LinkedInPostItem } from '../types';

interface LinkedInLiveFeedProps {
  linkedInData: LinkedInProfileSync;
  isSyncing: boolean;
  onManualSync: () => void;
  onOpenAutoSyncModal: () => void;
  onSimulatePost: (content: string, type: LinkedInPostItem['type']) => void;
}

export const LinkedInLiveFeed: React.FC<LinkedInLiveFeedProps> = ({
  linkedInData,
  isSyncing,
  onManualSync,
  onOpenAutoSyncModal,
  onSimulatePost,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'posts' | 'certifications'>('all');
  const [testPostInput, setTestPostInput] = useState('');
  const [isTestBoxOpen, setIsTestBoxOpen] = useState(false);

  const filteredPosts = linkedInData.posts.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'posts') return p.type === 'post' || p.type === 'project_launch';
    return false;
  });

  const handlePublishTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPostInput.trim()) return;
    onSimulatePost(testPostInput.trim(), 'post');
    setTestPostInput('');
    setIsTestBoxOpen(false);
  };

  return (
    <section id="linkedin-live-sync" className="py-24 bg-black border-t border-zinc-850 text-zinc-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Live Automation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-zinc-900 border border-zinc-700 text-white shadow-sm">
                <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
                Live Auto-Sync
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Synced: {linkedInData.lastSyncedAt || 'Active'}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              LinkedIn Automated Live Stream
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Real-time feed mirrored from <span className="text-white font-semibold">linkedin.com/in/shubham-w-02b8b2436</span>. New updates, posts, and certifications are automatically detected and published instantly.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onManualSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-750 transition-all cursor-pointer disabled:opacity-50"
              title="Force sync now"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-white ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>

            <button
              onClick={() => setIsTestBoxOpen(!isTestBoxOpen)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-zinc-200 text-black transition-all cursor-pointer shadow-sm"
              title="Test real-time update flow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test Live Update</span>
            </button>

            <button
              onClick={onOpenAutoSyncModal}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
              title="Auto-Sync Settings & Webhooks"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <a
              href={linkedInData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-750 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 text-white" />
              <span>Open LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </div>
        </div>

        {/* Live Simulator Drawer (when user wants to test instant sync) */}
        {isTestBoxOpen && (
          <div className="mb-8 p-5 bg-zinc-950 border border-zinc-700 rounded-2xl animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-xs font-bold font-heading text-white uppercase tracking-wider">
                  Real-Time Webhook Simulator: Publish New LinkedIn Post
                </span>
              </div>
              <button 
                onClick={() => setIsTestBoxOpen(false)}
                className="text-xs text-zinc-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-zinc-400 mb-3">
              Type any new announcement, post, or update below. When you click "Trigger Live Sync", it will be ingested immediately without reloading or editing code!
            </p>
            <form onSubmit={handlePublishTest} className="space-y-3">
              <textarea
                value={testPostInput}
                onChange={(e) => setTestPostInput(e.target.value)}
                placeholder="E.g., 🚀 Just shipped a major system performance update on GitHub with TypeScript! Here's what I learned..."
                className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 min-h-[75px]"
                rows={2}
                autoFocus
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span>Updates portfolio state in 0.1s</span>
                </div>
                <button
                  type="submit"
                  disabled={!testPostInput.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Trigger Live Sync</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LinkedIn Profile Snapshot Card */}
        <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-5 sm:p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white text-xl font-bold font-heading">
                S
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white text-[10px]">
                <Linkedin className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                  Shubham
                </h3>
                {linkedInData.openToWork && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-white text-black shadow-sm">
                    Open To Work
                  </span>
                )}
                <span className="text-xs text-zinc-400 font-mono">
                  {linkedInData.connectionsCount} connections
                </span>
              </div>
              <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                {linkedInData.headline}
              </p>
              <p className="text-[11px] text-zinc-500">
                {linkedInData.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-900 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">
                Sync Engine
              </span>
              <span className="text-xs font-semibold text-white flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3 h-3 text-white" />
                Active Polling
              </span>
            </div>
            <a
              href={linkedInData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-black hover:bg-zinc-200 transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Connect</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 border-b border-zinc-850 pb-3 mb-6 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-black font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            All Activity ({linkedInData.posts.length + linkedInData.certifications.length})
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'posts'
                ? 'bg-white text-black font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Posts &amp; Launches ({linkedInData.posts.length})
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'certifications'
                ? 'bg-white text-black font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Certifications ({linkedInData.certifications.length})
          </button>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Posts Column (2 cols wide on large screens) */}
          <div className={`${activeTab === 'certifications' ? 'hidden' : 'lg:col-span-2'} space-y-4`}>
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-zinc-950 border border-zinc-850 hover:border-zinc-700 rounded-2xl p-5 sm:p-6 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  {/* Post Author / Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-750 flex items-center justify-center font-bold text-white text-sm">
                        S
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs sm:text-sm font-heading">
                            {post.author}
                          </span>
                          {post.badge && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-zinc-900 text-zinc-300 border border-zinc-700">
                              {post.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                          <span>{post.authorRole}</span>
                          <span>•</span>
                          <span className="text-zinc-400 font-mono">{post.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors p-1"
                      title="View original on LinkedIn"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Post Content */}
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-line mb-3">
                    {post.content}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Social Metrics Bar */}
                <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.comments}</span>
                    </span>
                    <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{post.shares}</span>
                    </span>
                  </div>

                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-white hover:underline flex items-center gap-1 font-sans font-medium"
                  >
                    <span>View on LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications & Milestones Column */}
          <div className={`${activeTab === 'posts' ? 'hidden' : activeTab === 'certifications' ? 'lg:col-span-3' : 'lg:col-span-1'} space-y-4`}>
            
            <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-white" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
                    Verified Licenses &amp; Certifications
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  {linkedInData.certifications.length} Credentials
                </span>
              </div>

              <div className="space-y-3">
                {linkedInData.certifications.map((cert) => (
                  <div 
                    key={cert.id}
                    className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-xs font-bold text-white font-heading">
                        {cert.name}
                      </h5>
                      <Award className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      {cert.issuer} • <span className="font-mono">{cert.issueDate}</span>
                    </p>
                    {cert.credentialId && (
                      <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-zinc-500">
                        <span>ID: {cert.credentialId}</span>
                        <a
                          href={cert.credentialUrl || linkedInData.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:underline flex items-center gap-1"
                        >
                          Verify <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* LinkedIn Automation Banner */}
            <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-xs font-heading">
                <Briefcase className="w-4 h-4 text-white" />
                <span>Zero-Touch Profile Mirroring</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Any changes made on LinkedIn (roles, bio, headline, achievements) synchronize with this portfolio through the automated sync engine.
              </p>
              <button
                onClick={onOpenAutoSyncModal}
                className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-750 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Configure Webhook &amp; Polling &rarr;
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

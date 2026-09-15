import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  Star, 
  RefreshCw, 
  ExternalLink,
  Code2,
  Activity,
  Github,
  Linkedin,
  Check,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { ProfileData } from '../types';
import { 
  fetchLiveGitHubData, 
  GitHubLiveData, 
  ContributionDay 
} from '../services/githubService';

interface GitHubStatsProps {
  profile: ProfileData;
  onOpenProfileEditor?: () => void;
}

export const GitHubStats: React.FC<GitHubStatsProps> = ({ profile, onOpenProfileEditor }) => {
  const [liveData, setLiveData] = useState<GitHubLiveData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [colorScheme, setColorScheme] = useState<'monochrome' | 'emerald'>('monochrome');
  const [syncSuccess, setSyncSuccess] = useState(false);

  const loadData = async (forceRefresh = false) => {
    setIsLoading(true);
    if (forceRefresh) {
      try {
        localStorage.removeItem('etworkapp_github_live_cache_v1');
      } catch (_) {}
    }
    const data = await fetchLiveGitHubData(profile.githubUsername || 'etworkapp');
    setLiveData(data);
    setIsLoading(false);
    if (forceRefresh) {
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 2500);
    }
  };

  useEffect(() => {
    loadData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      loadData();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [profile.githubUsername]);

  const days = liveData?.contributions.days || [];
  const totalCommits = liveData?.contributions.totalLastYear || 19;
  const reposCount = liveData?.user.publicRepos || 4;
  const repos = liveData?.repos || [];
  const events = liveData?.events || [];
  const languages = liveData?.languages || [
    { name: 'TypeScript', count: 4, percent: 65 },
    { name: 'Kotlin', count: 1, percent: 20 },
    { name: 'JavaScript', count: 1, percent: 15 }
  ];

  const getMonochromeColor = (level: number) => {
    if (colorScheme === 'emerald') {
      if (level === 0) return 'bg-zinc-900 border-zinc-800/80';
      if (level === 1) return 'bg-emerald-950 border-emerald-800 text-emerald-300';
      if (level === 2) return 'bg-emerald-800 border-emerald-600 text-white';
      if (level === 3) return 'bg-emerald-600 border-emerald-400 text-white';
      return 'bg-emerald-400 border-emerald-300 text-black';
    }
    // High-contrast Stealth Black, Gray, and White palette
    if (level === 0) return 'bg-zinc-900/90 border-zinc-800/80';
    if (level === 1) return 'bg-zinc-700 border-zinc-600';
    if (level === 2) return 'bg-zinc-500 border-zinc-400';
    if (level === 3) return 'bg-zinc-300 border-zinc-200';
    return 'bg-white border-white shadow-xs';
  };

  return (
    <section id="github-activity" className="py-24 bg-black border-t border-zinc-800/80 relative text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Live Status & Sync Trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE GITHUB SYNC ACTIVE</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">@{profile.githubUsername}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              52-Week Contribution Matrix
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Live telemetry fetched directly from GitHub's REST API and commit logs for{' '}
              <span className="text-white font-mono">github.com/{profile.githubUsername}</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Palette Style Toggle */}
            <div className="inline-flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl text-xs">
              <button
                onClick={() => setColorScheme('monochrome')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  colorScheme === 'monochrome'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Monochrome
              </button>
              <button
                onClick={() => setColorScheme('emerald')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  colorScheme === 'emerald'
                    ? 'bg-zinc-800 text-emerald-300 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Emerald
              </button>
            </div>

            {/* Manual Sync Button */}
            <button
              onClick={() => loadData(true)}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 hover:text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
              title="Click to fetch newest changes from GitHub immediately"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-zinc-400' : 'text-zinc-300'}`} />
              <span>{isLoading ? 'Syncing...' : syncSuccess ? 'Synced!' : 'Sync Now'}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Overview Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Public Repos</span>
              <GitBranch className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">
              {isLoading ? '...' : reposCount}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">Verified on GitHub</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Yearly Activity</span>
              <Activity className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">
              {isLoading ? '...' : totalCommits}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">52-week contributions</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Top Language</span>
              <Code2 className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-2xl font-extrabold font-heading text-white truncate">
              {languages[0]?.name || 'TypeScript'}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              {languages[0]?.percent || 65}% of code share
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Sync Status</span>
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-xl font-bold font-heading text-white">
              {liveData?.user.lastSyncedAt || 'Live'}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">Auto-polls GitHub API</div>
          </div>
        </div>

        {/* 52-Week Contribution Matrix Display */}
        <div className="p-6 sm:p-7 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-2xl mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-zinc-900">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base">
                  GitHub Contribution Calendar (52 Weeks)
                </h3>
                <p className="text-xs text-zinc-400">
                  {totalCommits} contributions in the last year • updates automatically with your commits
                </p>
              </div>
            </div>

            {/* Matrix Legend */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <span className={`w-3 h-3 rounded-xs border ${getMonochromeColor(0)}`} />
                <span className={`w-3 h-3 rounded-xs border ${getMonochromeColor(1)}`} />
                <span className={`w-3 h-3 rounded-xs border ${getMonochromeColor(2)}`} />
                <span className={`w-3 h-3 rounded-xs border ${getMonochromeColor(3)}`} />
                <span className={`w-3 h-3 rounded-xs border ${getMonochromeColor(4)}`} />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Contribution Heatmap Grid */}
          <div className="overflow-x-auto py-2">
            <div className="inline-grid grid-rows-7 grid-flow-col gap-[3.5px] min-w-[760px]">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`w-3 h-3 rounded-[2px] border transition-all duration-150 cursor-pointer ${getMonochromeColor(
                    day.level
                  )} hover:scale-135 hover:z-20`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Date Inspector / Tooltip Bar */}
          <div className="mt-4 pt-3 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-2 font-mono">
              {hoveredDay ? (
                <span className="text-white">
                  <strong>{hoveredDay.count}</strong> contribution{hoveredDay.count !== 1 ? 's' : ''} on{' '}
                  <span className="text-zinc-300 font-bold">{hoveredDay.date}</span>
                </span>
              ) : (
                <span className="text-zinc-500">
                  Hover over any day square in the matrix to inspect exact commit counts and dates.
                </span>
              )}
            </div>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors font-medium text-xs group"
            >
              <span>View full activity on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Live Repositories & Real Push Events Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Live Repositories from GitHub */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2.5">
                <GitBranch className="w-4 h-4 text-zinc-300" />
                <h3 className="font-heading font-bold text-white text-base">
                  Public Repositories ({repos.length})
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                Live GitHub Sync
              </span>
            </div>

            <div className="space-y-3">
              {repos.slice(0, 4).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-heading font-bold text-white text-sm group-hover:text-zinc-200 flex items-center gap-1.5">
                      {repo.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                      {repo.language || 'Code'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {repo.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-zinc-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stars}
                    </span>
                    <span>•</span>
                    <span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Live Recent Commit / Push Events */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2.5">
                <GitCommit className="w-4 h-4 text-zinc-300" />
                <h3 className="font-heading font-bold text-white text-base">
                  Latest GitHub Push Events
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                Continuous Stream
              </span>
            </div>

            <div className="space-y-3">
              {events.slice(0, 4).map((ev) => (
                <div
                  key={ev.id}
                  className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <a
                      href={ev.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-zinc-200 hover:text-white font-medium truncate max-w-[260px] flex items-center gap-1"
                    >
                      {ev.repoName}
                    </a>
                    <span className="text-[11px] text-zinc-500 font-mono">{ev.timestamp}</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans leading-snug">
                    {ev.message}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                    <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">{ev.branch}</span>
                    <span>commit {ev.commitHash}</span>
                    <span className="text-zinc-400">✓ live</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Live Social & Profile Sync Card (GitHub + LinkedIn) */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-6 h-6 text-zinc-200" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base">
                Connected Profiles & Live Sync Hub
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                GitHub: <span className="text-zinc-200 font-mono">@{profile.githubUsername}</span> | 
                LinkedIn: <span className="text-zinc-200 font-mono">shubham-w-02b8b2436</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>Open LinkedIn</span>
            </a>

            {onOpenProfileEditor && (
              <button
                onClick={onOpenProfileEditor}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
              >
                <span>Edit &amp; Sync Profile</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/portfolioData';
import { PortfolioContent, LinkedInProfileSync, SyncLogEntry, LinkedInPostItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { LinkedInLiveFeed } from './components/LinkedInLiveFeed';
import { LeadershipAndDistinctions } from './components/LeadershipAndDistinctions';
import { GitHubStats } from './components/GitHubStats';
import { EngineeringStandards } from './components/EngineeringStandards';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GitHubDeployGuideModal } from './components/GitHubDeployGuideModal';
import { ResumeModal } from './components/ResumeModal';
import { EditProfileModal } from './components/EditProfileModal';
import { DeveloperTerminal } from './components/DeveloperTerminal';
import { AutoSyncModal } from './components/AutoSyncModal';
import { autoSyncEngine } from './services/autoSyncEngine';
import { GitHubLiveData } from './services/githubService';
import { Terminal, Radio } from 'lucide-react';

const STORAGE_KEY = 'etworkapp_portfolio_data_v15';

export default function App() {
  const [data, setData] = useState<PortfolioContent>(() => {
    try {
      // Clear legacy storage keys
      [
        'shubham_portfolio_data_v1', 
        'shubham_portfolio_data_v2', 
        'etworkapp_portfolio_data_v3', 
        'etworkapp_portfolio_data_v4', 
        'etworkapp_portfolio_data_v5', 
        'etworkapp_portfolio_data_v6', 
        'etworkapp_portfolio_data_v7',
        'etworkapp_portfolio_data_v8',
        'etworkapp_portfolio_data_v9',
        'etworkapp_portfolio_data_v10',
        'etworkapp_portfolio_data_v11',
        'etworkapp_portfolio_data_v12',
        'etworkapp_portfolio_data_v13',
        'etworkapp_portfolio_data_v14'
      ].forEach(k => {
        try { localStorage.removeItem(k); } catch (_) {}
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.profile = {
          ...parsed.profile,
          name: 'Shubham',
          role: initialPortfolioData.profile.role,
          email: 'shubhampw2026@gmail.com',
          linkedinUrl: 'https://www.linkedin.com/in/shubham-w-02b8b2436/',
          githubUsername: 'etworkapp',
          githubUrl: 'https://github.com/etworkapp'
        };
        parsed.skills = initialPortfolioData.skills;
        parsed.projects = initialPortfolioData.projects;
        parsed.experiences = initialPortfolioData.experiences;
        parsed.education = initialPortfolioData.education;
        parsed.distinctions = initialPortfolioData.distinctions;
        parsed.interests = initialPortfolioData.interests;
        parsed.softSkills = initialPortfolioData.softSkills;
        parsed.languages = initialPortfolioData.languages;
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load portfolio from localStorage', e);
    }
    return initialPortfolioData;
  });

  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAutoSyncOpen, setIsAutoSyncOpen] = useState(false);

  // Auto-Sync Engine State
  const [linkedInData, setLinkedInData] = useState<LinkedInProfileSync>(autoSyncEngine.getLinkedInData());
  const [liveGitHubData, setLiveGitHubData] = useState<GitHubLiveData | null>(null);
  const [syncLogs, setSyncLogs] = useState<SyncLogEntry[]>(autoSyncEngine.getLogs());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncConfig, setSyncConfig] = useState(autoSyncEngine.getConfig());
  const [syncNotification, setSyncNotification] = useState<string | null>(null);

  // Subscribe to automated background sync updates
  useEffect(() => {
    autoSyncEngine.start();

    const unsubscribe = autoSyncEngine.subscribe((snapshot) => {
      setLinkedInData(snapshot.linkedInData);
      if (snapshot.githubData) {
        setLiveGitHubData(snapshot.githubData);
      }
      setSyncLogs(snapshot.logs);
      setIsSyncing(snapshot.isSyncing);
      setSyncConfig(autoSyncEngine.getConfig());
    });

    return () => {
      unsubscribe();
      autoSyncEngine.stop();
    };
  }, []);

  // Global hotkey to launch developer terminal (Ctrl + ` or Backquote)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSaveData = (updatedData: PortfolioContent) => {
    setData(updatedData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const handleResetData = () => {
    setData(initialPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear localStorage', e);
    }
  };

  const showSyncToast = (msg: string) => {
    setSyncNotification(msg);
    setTimeout(() => setSyncNotification(null), 3500);
  };

  const handleForceManualSync = async () => {
    await autoSyncEngine.executeFullSync();
    showSyncToast('Live sync completed. Mirrored latest updates from LinkedIn & GitHub.');
  };

  const handleSimulateLinkedInPost = (content: string, type: LinkedInPostItem['type'] = 'post') => {
    autoSyncEngine.triggerLinkedInPostUpdate({
      content,
      type,
      badge: 'Live Auto-Sync',
      tags: ['#LinkedInLive', '#Engineering', '#AutoSync']
    });
    showSyncToast('⚡ New LinkedIn post ingested! Portfolio updated immediately.');
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black flex flex-col relative">
      {/* Subtle monochrome ambient light effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-zinc-800/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-[160px]" />
      </div>

      {/* Real-time Toast Notification banner */}
      {syncNotification && (
        <div className="fixed top-20 right-5 z-50 bg-zinc-950 border border-zinc-700 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span className="text-xs font-mono font-medium">{syncNotification}</span>
        </div>
      )}

      {/* Top sticky navigation */}
      <Navbar
        profile={data.profile}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenAutoSync={() => setIsAutoSyncOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1 relative z-10">
        <Hero
          profile={data.profile}
          onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <About profile={data.profile} />

        <Skills 
          skills={data.skills} 
          softSkills={data.softSkills}
          languages={data.languages}
        />

        {/* Projects automatically merged with live GitHub repos */}
        <Projects 
          projects={data.projects} 
          liveRepos={liveGitHubData?.repos}
        />

        {/* Leadership, Extracurriculars, Sports, Arts & Social Impact */}
        <LeadershipAndDistinctions
          distinctions={data.distinctions}
          interests={data.interests}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Real-time Automated LinkedIn Activity Feed */}
        <LinkedInLiveFeed
          linkedInData={linkedInData}
          isSyncing={isSyncing}
          onManualSync={handleForceManualSync}
          onOpenAutoSyncModal={() => setIsAutoSyncOpen(true)}
          onSimulatePost={handleSimulateLinkedInPost}
        />

        {/* Dynamic GitHub 52-Week Contribution Matrix & Live Events */}
        <GitHubStats profile={data.profile} />

        <EngineeringStandards />

        <ExperienceTimeline
          experiences={data.experiences}
          education={data.education}
        />

        <ContactSection
          profile={data.profile}
          onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={data.profile}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* Floating Interactive Controls (CLI & AutoSync) in Monochrome */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setIsAutoSyncOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-500 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-105"
          id="floating-autosync-launcher"
          title="Open Auto-Sync Hub"
        >
          <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="text-xs font-mono font-semibold">Auto-Sync</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
        </button>

        <button
          onClick={() => setIsTerminalOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-500 shadow-2xl backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-105"
          id="floating-cli-launcher"
          title="Open interactive terminal console (Ctrl + `)"
        >
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          <Terminal className="w-4 h-4 text-white" />
          <span className="text-xs font-mono font-semibold">Dev CLI</span>
          <span className="hidden sm:inline text-[10px] font-mono text-zinc-400 bg-black px-1.5 py-0.5 rounded border border-zinc-800">
            Ctrl+`
          </span>
        </button>
      </div>

      {/* Interactive Developer CLI Shell Drawer */}
      <DeveloperTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        data={data}
        onOpenDeployGuide={() => {
          setIsTerminalOpen(false);
          setIsDeployGuideOpen(true);
        }}
      />

      {/* Auto-Sync & Automation Hub Modal */}
      <AutoSyncModal
        isOpen={isAutoSyncOpen}
        onClose={() => setIsAutoSyncOpen(false)}
        isEnabled={syncConfig.enabled}
        intervalSec={syncConfig.intervalSec}
        onToggleEnabled={(enabled) => autoSyncEngine.setEnabled(enabled)}
        onChangeInterval={(sec) => autoSyncEngine.setIntervalSec(sec)}
        onForceSync={handleForceManualSync}
        onTriggerTestPost={handleSimulateLinkedInPost}
        logs={syncLogs}
        isSyncing={isSyncing}
      />

      {/* GitHub Deployment Modal */}
      <GitHubDeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
        githubUsername={data.profile.githubUsername}
      />

      {/* Resume View Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        data={data}
      />

      {/* Profile Editor Modal */}
      <EditProfileModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
    </div>
  );
}

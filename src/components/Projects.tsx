import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Layers, 
  Sparkles, 
  Eye
} from 'lucide-react';
import { ProjectItem } from '../types';
import { GitHubRepoItem } from '../services/githubService';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  projects: ProjectItem[];
  liveRepos?: GitHubRepoItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects, liveRepos = [] }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Merge any live repos from GitHub that aren't already represented
  const mergedProjects: ProjectItem[] = React.useMemo(() => {
    const list = [...projects];
    if (liveRepos && liveRepos.length > 0) {
      liveRepos.forEach((r) => {
        const alreadyExists = list.some(
          p => p.title.toLowerCase().includes(r.name.toLowerCase()) || 
               p.githubUrl.toLowerCase().includes(r.name.toLowerCase())
        );
        if (!alreadyExists) {
          list.push({
            id: `gh-auto-${r.id}`,
            title: r.name,
            description: r.description || `Active open-source repository on GitHub (${r.language || 'Code'}).`,
            longDescription: `${r.description || 'Public repository.'} Star count: ${r.stars}, Forks: ${r.forks}. Written in ${r.language || 'TypeScript'}.`,
            tags: [r.language || 'TypeScript', ...(r.topics || []), 'GitHub Auto-Sync'],
            category: 'all',
            githubUrl: r.htmlUrl,
            image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop',
            features: [
              `Auto-synced from github.com/etworkapp/${r.name}`,
              `Stars: ${r.stars} | Forks: ${r.forks}`,
              `Last push: ${new Date(r.updatedAt).toLocaleDateString()}`
            ],
            role: 'Repository Author',
            featured: false
          });
        }
      });
    }
    return list;
  }, [projects, liveRepos]);

  const tabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'cloud', label: 'Cloud & AWS' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
  ];

  const filteredProjects = activeTab === 'all'
    ? mergedProjects
    : mergedProjects.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-24 bg-black border-t border-zinc-800/80 relative text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Featured Portfolio
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Projects &amp; Systems Architecture
          </p>
          <p className="text-zinc-400 text-sm sm:text-base">
            Engineered with React, TypeScript, and modern system architectures. Open-source repositories hosted with automated GitHub pipelines.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {tabs.map((tab) => {
            const count = tab.id === 'all' 
              ? mergedProjects.length 
              : mergedProjects.filter(p => p.category === tab.id).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-lg font-semibold scale-105'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
                id={`project-tab-${tab.id}`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-black text-white' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-950/80 rounded-2xl border border-zinc-800/90 overflow-hidden flex flex-col hover:border-zinc-600 hover:shadow-2xl transition-all duration-300 group top-glow-border backdrop-blur-md"
              id={`project-card-${project.id}`}
            >
              {/* Window Frame Bar */}
              <div className="px-4 py-2 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-red-500/80 transition-colors" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-amber-500/80 transition-colors" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-emerald-500/80 transition-colors" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[180px]">
                  {project.category.toUpperCase()} // {project.title.slice(0, 20)}
                </span>
                <div className="w-2" />
              </div>

              {/* Image banner preview */}
              <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-95" />

                {/* Badges on preview */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-zinc-900/90 text-zinc-200 border border-zinc-700 backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white text-black backdrop-blur-sm">
                      Featured
                    </span>
                  )}
                </div>

                {/* Quick inspect button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-zinc-900/90 hover:bg-white hover:text-black text-white text-xs backdrop-blur-md border border-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                  title="View full specs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">Inspect Specs</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white font-heading group-hover:text-zinc-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Bullet features if available */}
                  {project.features && project.features.length > 0 && (
                    <div className="pt-2 border-t border-zinc-900/80">
                      <ul className="space-y-1 text-[11px] text-zinc-400">
                        {project.features.slice(0, 2).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5">
                            <span className="text-zinc-600 mt-0.5">•</span>
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800/80"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-zinc-500 font-mono">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Card Action Links */}
                <div className="pt-3 border-t border-zinc-900 flex items-center justify-between gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white py-1.5 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs text-zinc-400 hover:text-white font-medium py-1 px-2 cursor-pointer transition-colors"
                    >
                      Deep Dive
                    </button>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-black py-1.5 px-3 rounded-lg bg-white hover:bg-zinc-200 transition-all shadow-sm"
                      >
                        <span>Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Database, 
  Wrench, 
  Sparkles,
  Search,
  Coffee,
  Cloud,
  Cpu,
  BarChart3,
  Box,
  Radio,
  FileCode,
  Layout,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  Users2,
  MessageSquare,
  Award
} from 'lucide-react';
import { SkillItem } from '../types';

interface SkillsProps {
  skills: SkillItem[];
  softSkills?: string[];
  languages?: string[];
}

export const Skills: React.FC<SkillsProps> = ({ 
  skills,
  softSkills = [
    "Communication",
    "Problem Solving",
    "Teamwork",
    "Leadership",
    "Time Management"
  ],
  languages = [
    "English",
    "Hindi",
    "Marathi",
    "French"
  ]
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Tech', icon: Sparkles },
    { id: 'programming', label: 'Programming', icon: Code2 },
    { id: 'frontend', label: 'Web Dev', icon: Layout },
    { id: 'backend', label: 'Backend', icon: Layers },
    { id: 'database', label: 'Databases', icon: Database },
    { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud },
    { id: 'datascience', label: 'Data Science', icon: BarChart3 },
    { id: 'core', label: 'Core Subjects', icon: Cpu },
    { id: 'tools', label: 'Tools', icon: Wrench },
  ];

  const getSkillIcon = (iconName: string, category: string) => {
    switch (iconName.toLowerCase()) {
      case 'coffee':
        return Coffee;
      case 'cloud':
        return Cloud;
      case 'database':
        return Database;
      case 'barchart3':
      case 'barchart2':
      case 'piechart':
      case 'filespreadsheet':
        return BarChart3;
      case 'cpu':
        return Cpu;
      case 'box':
        return Box;
      case 'radio':
        return Radio;
      case 'layout':
      case 'atom':
        return Layout;
      case 'checkcircle2':
        return CheckCircle2;
      case 'shieldcheck':
        return ShieldCheck;
      case 'filecode':
        return FileCode;
      default:
        if (category === 'cloud') return Cloud;
        if (category === 'database') return Database;
        if (category === 'datascience') return BarChart3;
        if (category === 'core') return Cpu;
        if (category === 'backend') return Layers;
        return Code2;
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 bg-black border-t border-zinc-800/80 relative text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Engineering Capabilities Matrix
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Skills &amp; Technologies
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Comprehensive skill set across programming, cloud architecture, backend systems, data science, and core engineering fundamentals.
          </p>

          {/* Quick Metrics Strip */}
          <div className="flex items-center justify-center gap-4 pt-2 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 bg-zinc-900/60 px-2.5 py-1 rounded-lg border border-zinc-800">
              <span className="text-white font-bold">{skills.length}</span> Total Skills
            </span>
            <span className="flex items-center gap-1.5 bg-zinc-900/60 px-2.5 py-1 rounded-lg border border-zinc-800">
              <span className="text-emerald-400 font-bold">{skills.filter(s => s.level >= 85).length}</span> Expert Tier
            </span>
            <span className="flex items-center gap-1.5 bg-zinc-900/60 px-2.5 py-1 rounded-lg border border-zinc-800">
              <span className="text-blue-400 font-bold">{skills.filter(s => s.featured).length}</span> Core Pillars
            </span>
          </div>
        </div>

        {/* Filter Controls Bar in Monochrome */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-2 justify-center lg:justify-start">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-md font-semibold'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                  }`}
                  id={`skill-cat-btn-${cat.id}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick search input */}
          <div className="relative w-full lg:w-64 shrink-0">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (Java, AWS, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
              id="skill-search-input"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-sm">
            No skills found matching "{searchQuery}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill, idx) => {
              const IconComponent = getSkillIcon(skill.iconName, skill.category);
              return (
                <div
                  key={idx}
                  className="bg-zinc-950/80 hover:bg-zinc-900/90 rounded-xl border border-zinc-800/90 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 shadow-md group top-glow-border backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-300 group-hover:scale-105 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shadow-sm">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-zinc-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    {skill.featured ? (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded-full font-semibold">
                        Core
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded">
                        {skill.level}%
                      </span>
                    )}
                  </div>

                  {/* Progress Bar & Percentage */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-zinc-400">
                      <span className="capitalize font-mono text-[10px] text-zinc-500">{skill.category}</span>
                      <span className="font-mono text-zinc-300 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/60">
                      <div
                        className="h-full bg-gradient-to-r from-zinc-500 via-zinc-300 to-white rounded-full transition-all duration-500 group-hover:from-emerald-400 group-hover:to-white"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Supplementary Competencies: Soft Skills & Languages */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-zinc-900">
          {/* Soft Skills */}
          <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <Users2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-heading">
                  Soft Skills &amp; Professional Competencies
                </h3>
                <p className="text-xs text-zinc-400">
                  Interpersonal attributes driving cross-functional project success
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {softSkills.map((soft, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 text-zinc-200 border border-zinc-800 text-xs font-medium hover:border-zinc-700 transition-colors"
                >
                  <Award className="w-3 h-3 text-zinc-400" />
                  {soft}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <Globe2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-heading">
                  Multilingual Proficiency
                </h3>
                <p className="text-xs text-zinc-400">
                  Global and regional communication capabilities
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 text-zinc-200 border border-zinc-800 text-xs font-medium hover:border-zinc-700 transition-colors"
                >
                  <MessageSquare className="w-3 h-3 text-zinc-400" />
                  {lang}
                  {lang === "French" && (
                    <span className="text-[10px] text-zinc-400 font-mono bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                      SPPU Diploma
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

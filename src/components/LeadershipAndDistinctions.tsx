import React, { useState } from 'react';
import { 
  Award, 
  Users, 
  Trophy, 
  Globe2, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  TrendingUp, 
  Briefcase, 
  Compass,
  ArrowUpRight,
  Code2,
  BookOpen
} from 'lucide-react';
import { DistinctionItem } from '../types';

interface LeadershipAndDistinctionsProps {
  distinctions?: DistinctionItem[];
  interests?: string[];
  onOpenResume?: () => void;
}

export const LeadershipAndDistinctions: React.FC<LeadershipAndDistinctionsProps> = ({
  distinctions = [],
  interests = [],
  onOpenResume
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<DistinctionItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Distinctions', count: distinctions.length },
    { id: 'leadership', label: 'Leadership', count: distinctions.filter(d => d.category === 'leadership').length },
    { id: 'hackathon', label: 'Hackathons & Contests', count: distinctions.filter(d => d.category === 'hackathon').length },
    { id: 'volunteering', label: 'NGO & Social Impact', count: distinctions.filter(d => d.category === 'volunteering').length },
    { id: 'certification', label: 'Certifications', count: distinctions.filter(d => d.category === 'certification').length },
  ];

  const filteredItems = activeCategory === 'all'
    ? distinctions
    : distinctions.filter(d => d.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'leadership':
        return <Users className="w-4 h-4 text-white" />;
      case 'hackathon':
        return <Trophy className="w-4 h-4 text-white" />;
      case 'volunteering':
        return <HeartHandshake className="w-4 h-4 text-white" />;
      case 'certification':
        return <Award className="w-4 h-4 text-white" />;
      default:
        return <Sparkles className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section id="leadership-extracurriculars" className="py-24 bg-black border-t border-zinc-850 text-zinc-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with High-Tech Monochromatic Craft */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-zinc-900 border border-zinc-700 text-white shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                Leadership &amp; Technical Distinctions
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Leadership, Hackathons &amp; Social Impact
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Bridging high-performance engineering with technical club leadership, national hackathons, foreign language proficiency, and community environmental conservation.
            </p>
          </div>

          {/* Quick Action Button */}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-all cursor-pointer shadow-sm self-start md:self-auto shrink-0"
            >
              <span>Inspect in Curriculum Vitae</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 4 Distinctive Architectural Highlights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-zinc-700 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                Cisco NetAcad
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight group-hover:text-zinc-200">
                500+
              </div>
              <div className="text-xs font-bold text-zinc-200 mt-0.5">Students Mentored</div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                Activity Head &amp; club founder conducting campus-wide technical boot camps.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-zinc-700 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <Trophy className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                Oracle Hacks!
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight group-hover:text-zinc-200">
                Smart Contracts
              </div>
              <div className="text-xs font-bold text-zinc-200 mt-0.5">Hedera Hashgraph</div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                Decentralized app tooling &amp; APIs, advancing through hackathon selection rounds.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-zinc-700 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <Globe2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                SPPU
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight group-hover:text-zinc-200">
                French Diploma
              </div>
              <div className="text-xs font-bold text-zinc-200 mt-0.5">Linguistic Certification</div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                Diploma from Savitribai Phule Pune University; multilingual cross-cultural skills.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-zinc-700 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                Lions Club NEP
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight group-hover:text-zinc-200">
                Eco Conservation
              </div>
              <div className="text-xs font-bold text-zinc-200 mt-0.5">Nature Lovers Volunteer</div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                Environmental awareness, rainwater harvesting, and community sapling plantation.
              </p>
            </div>
          </div>

        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 text-xs font-medium">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850 border border-zinc-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                activeCategory === cat.id ? 'bg-black text-white' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Bento Grid for Distinctions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-950 border border-zinc-850 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group hover:shadow-xl"
            >
              <div>
                {/* Header with category icon and badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-750 flex items-center justify-center">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                        {item.organization}
                      </span>
                      <h3 className="text-base font-bold text-white font-heading group-hover:text-zinc-200 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {item.role && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-zinc-900 text-zinc-300 border border-zinc-750 shrink-0">
                      {item.role}
                    </span>
                  )}
                </div>

                {/* Badge & Metrics */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-black font-semibold">
                    {item.badge}
                  </span>
                  {item.metrics && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800">
                      {item.metrics}
                    </span>
                  )}
                </div>

                {/* Highlights List */}
                <ul className="space-y-2 mb-4">
                  {item.highlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="capitalize">{item.category.replace('_', ' & ')}</span>
                <span className="text-zinc-500">Verified Record</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interests & Intellectual Pursuits Strip */}
        {interests && interests.length > 0 && (
          <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-bold font-heading text-sm sm:text-base">
                  <Compass className="w-4 h-4 text-white" />
                  <span>Core Intellectual Passions &amp; Research Interests</span>
                </div>
                <p className="text-xs text-zinc-400 max-w-xl">
                  Curiosity-driven disciplines shaping technical viewpoints, system architectures, and continuous life-long learning.
                </p>
              </div>

              {/* Tag Pills in Monochrome */}
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 text-xs text-zinc-200 font-medium transition-colors group cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { ExperienceItem, EducationItem } from '../types';

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  education: EducationItem[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  education,
}) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  return (
    <section id="experience" className="py-24 bg-black border-t border-zinc-800/80 text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Career Journey
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Experience &amp; Education
          </p>
          <p className="text-zinc-400 text-sm">
            Professional track record in software engineering, frontend architecture, and continuous learning.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="p-1 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
              id="tab-experience"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Work Experience</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
              id="tab-education"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        {activeTab === 'experience' ? (
          <div className="relative border-l-2 border-zinc-800/80 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
            {experiences.map((item) => (
              <div key={item.id} className="relative group">
                {/* Timeline Dot */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                  item.current 
                    ? 'bg-emerald-400 border-emerald-200 ring-4 ring-emerald-950/80 shadow-[0_0_12px_rgba(52,211,153,0.6)]' 
                    : 'bg-zinc-950 border-zinc-500'
                }`} />

                {/* Card */}
                <div className="bg-zinc-950/90 border border-zinc-800/90 hover:border-zinc-600 rounded-2xl p-6 transition-all duration-300 shadow-xl space-y-4 top-glow-border backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                          {item.company}
                        </span>
                        {item.current && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-semibold">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                        {item.role}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1.5 font-mono bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-800 text-zinc-300">
                        <Calendar className="w-3 h-3 text-zinc-400" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1 text-zinc-400">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  {item.achievements && (
                    <div className="space-y-2 pt-1">
                      {item.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack */}
                  {item.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-900">
                      {item.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative border-l-2 border-zinc-800/80 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
            {education.map((edu) => (
              <div key={edu.id} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full border-2 bg-white border-zinc-300 transition-transform duration-300 group-hover:scale-125 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />

                <div className="bg-zinc-950/90 border border-zinc-800/90 hover:border-zinc-600 rounded-2xl p-6 shadow-xl space-y-3 top-glow-border backdrop-blur-sm transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900 pb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                        {edu.degree}
                      </h3>
                      <p className="text-xs font-medium text-zinc-400 mt-0.5">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1.5 font-mono bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-800 text-zinc-300">
                        <Calendar className="w-3 h-3 text-zinc-400" />
                        {edu.period}
                      </span>
                      {edu.score && (
                        <span className="text-emerald-400 font-mono font-semibold bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/60">
                          {edu.score}
                        </span>
                      )}
                    </div>
                  </div>

                  {edu.description && (
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

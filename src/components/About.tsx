import React from 'react';
import { 
  Code, 
  Rocket, 
  MapPin, 
  Mail, 
  Github, 
  Laptop, 
  Sparkles,
  GitBranch,
  Linkedin
} from 'lucide-react';
import { ProfileData } from '../types';

interface AboutProps {
  profile: ProfileData;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const highlights = [
    {
      icon: Laptop,
      title: "Full Stack & Microservices",
      description: "Developing end-to-end applications with React, TypeScript, Java Spring Boot, and Apache Kafka event streams.",
    },
    {
      icon: Rocket,
      title: "Cloud & AWS Infrastructure",
      description: "Deploying production Linux instances on AWS EC2, configuring S3 storage, Docker containerization, and networking rules.",
    },
    {
      icon: GitBranch,
      title: "Web3 & Blockchain Systems",
      description: "Writing and auditing Solidity smart contracts for pharmaceutical supply chain provenance with Ganache and MetaMask integration.",
    },
    {
      icon: Code,
      title: "Enterprise Quality & CI/CD",
      description: "Rigorous test automation with Tosca, Swagger/Postman API validation, and automated zero-downtime GitHub Actions deployments.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#08090d] border-t border-zinc-800/80 text-zinc-100 bg-dots-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            Profile &amp; Engineering Pedigree
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Engineering Clean, Scalable Solutions
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Technical philosophy, software engineering focus, and background in building production cloud &amp; Web3 applications.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Bio Card */}
          <div className="lg:col-span-5 bg-zinc-950/90 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl top-glow-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700 flex items-center justify-center text-white font-heading font-black text-2xl shadow-md">
                {profile.name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">{profile.name}</h3>
                <p className="text-xs font-medium text-zinc-300">{profile.role}</p>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {profile.bio}
            </p>

            {/* Verified Credentials Pills */}
            <div className="space-y-2 pt-2 border-t border-zinc-900">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block">
                Verified Credentials &amp; Honors
              </span>
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-300 font-medium">B.E. Computer Engineering</span>
                  <span className="text-emerald-400 font-mono font-bold">8.48 CGPA (Distinction)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-300 font-medium">Cognizant GenC Elevate</span>
                  <span className="text-zinc-400 font-mono">Full Stack Java Training</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-300 font-medium">SPPU French Diploma</span>
                  <span className="text-zinc-400 font-mono">Certified Multilingual</span>
                </div>
              </div>
            </div>

            {/* Architecture Note */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 space-y-1">
              <div className="font-semibold flex items-center gap-1.5 text-white">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                <span>Production GitHub Pages &amp; AWS:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-400">
                Crafted for zero-friction GitHub hosting with relative asset resolution (<code className="text-white font-mono">base: './'</code>), automated GitHub Actions CI/CD workflows, and AWS EC2 cloud hosting readiness.
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-900 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-zinc-500 block mb-0.5 font-mono text-[11px]">DIRECT EMAIL</span>
                <a href={`mailto:${profile.email}`} className="text-zinc-200 hover:text-white font-mono truncate block">
                  {profile.email}
                </a>
              </div>
              <div>
                <span className="text-zinc-500 block mb-0.5 font-mono text-[11px]">LINKEDIN</span>
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-zinc-200 hover:text-white font-mono truncate block">
                  Connect &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Core Strengths Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-zinc-950/80 rounded-2xl border border-zinc-800/90 p-6 hover:border-zinc-600 hover:bg-zinc-900/80 transition-all duration-300 group shadow-lg"
                >
                  <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-300 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 mb-4 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white font-heading mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

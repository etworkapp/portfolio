import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { PortfolioContent } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioContent;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  const { profile, skills, experiences, education, projects } = data;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${profile.name.toLowerCase().replace(/\s+/g, '_')}_resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-zinc-950 border border-zinc-800 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls header in Monochrome */}
        <div className="p-4 bg-black border-b border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-white text-base">
              Curriculum Vitae Preview
            </span>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              ({profile.name})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer shadow-sm"
              title="Print to PDF"
              id="btn-print-resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 transition-colors cursor-pointer"
              title="Download structured JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">JSON</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white text-zinc-900 text-xs sm:text-sm font-sans print:p-0 print:m-0">
          
          {/* Header */}
          <div className="border-b-2 border-zinc-900 pb-5 mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 font-heading">
                {profile.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-zinc-700 mt-0.5">
                {profile.role}
              </p>
              <p className="text-xs text-zinc-600 max-w-xl mt-1.5 leading-relaxed">
                {profile.bio}
              </p>
            </div>

            <div className="text-xs text-zinc-600 space-y-1 sm:text-right shrink-0">
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-zinc-700" />
                <span>{profile.email}</span>
              </div>
              {profile.phone && (
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-700" />
                  <span>{profile.phone}</span>
                </div>
              )}
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-700" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 text-zinc-900 font-medium">
                <Github className="w-3.5 h-3.5" />
                <span>github.com/{profile.githubUsername}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 text-zinc-900 font-medium">
                <Linkedin className="w-3.5 h-3.5" />
                <span>linkedin.com/in/shubham-w-02b8b2436</span>
              </div>
            </div>
          </div>

          {/* Core Technical Skills */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5 font-heading">
              Technical Skills &amp; Competencies
            </h2>
            <div className="space-y-1 text-xs text-zinc-800 leading-relaxed">
              <div>
                <strong className="text-zinc-900 font-semibold">Programming:</strong>{' '}
                <span>C++, Java, Python, JavaScript, PHP, SQL</span>
              </div>
              <div>
                <strong className="text-zinc-900 font-semibold">Web Development:</strong>{' '}
                <span>HTML, CSS, JavaScript, React.js, Angular.js, Node.js, REST APIs</span>
              </div>
              <div>
                <strong className="text-zinc-900 font-semibold">Backend / Frameworks:</strong>{' '}
                <span>Spring Boot, Spring Suite, Node.js, Apache Kafka, Camunda</span>
              </div>
              <div>
                <strong className="text-zinc-900 font-semibold">Databases:</strong>{' '}
                <span>SQL, Relational Databases, Hadoop, Cassandra</span>
              </div>
              <div>
                <strong className="text-zinc-900 font-semibold">Cloud / DevOps:</strong>{' '}
                <span>AWS (EC2, S3), Microsoft Azure, Docker, Kubernetes</span>
              </div>
              <div>
                <strong className="text-zinc-900 font-semibold">Data Science:</strong>{' '}
                <span>Python, TensorFlow, NumPy, Pandas, Matplotlib, Power BI, Tableau, Microsoft Excel</span>
              </div>
              <div>
                <strong className="text-zinc-900 font-semibold">Core Subjects:</strong>{' '}
                <span>Data Structures and Algorithms, DBMS, Operating Systems, Computer Networks, Cloud Computing</span>
              </div>
              <div>
                <strong className="text-zinc-900 font-semibold">Tools &amp; Web3:</strong>{' '}
                <span>Postman, Swagger UI, Ganache, MetaMask, Git &amp; GitHub</span>
              </div>
              <div>
                <strong className="text-zinc-900 font-semibold">Soft Skills:</strong>{' '}
                <span>Communication, Problem Solving, Teamwork, Leadership, Time Management</span>
              </div>
              <div>
                <strong className="text-zinc-900 font-semibold">Languages:</strong>{' '}
                <span>English, Hindi, Marathi, French (SPPU Diploma)</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-3 font-heading">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-900">
                      {exp.role} <span className="font-normal text-zinc-600">| {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                  </div>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    {exp.description}
                  </p>
                  {exp.achievements && (
                    <ul className="list-disc list-inside text-xs text-zinc-600 space-y-0.5">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="text-[11px] text-zinc-600 pt-0.5">
                      <strong className="text-zinc-800 font-medium">Technologies:</strong>{' '}
                      <span className="font-mono text-zinc-500">{exp.technologies.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notable Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-3 font-heading">
              Key Projects
            </h2>
            <div className="space-y-4">
              {projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-900 text-xs">
                      {proj.title}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-600">
                      {proj.tags.slice(0, 4).join(' • ')}
                    </span>
                  </div>
                  {proj.features && proj.features.length > 0 ? (
                    <ul className="list-disc list-inside text-xs text-zinc-700 space-y-0.5">
                      {proj.features.map((feat, fIdx) => (
                        <li key={fIdx}>{feat}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-zinc-600">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-heading">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs gap-3">
                  <div>
                    <strong className="text-zinc-900">{edu.degree}</strong> –{' '}
                    <span className="text-zinc-600">{edu.institution}</span>
                  </div>
                  <div className="text-zinc-500 font-mono text-right flex-shrink-0">
                    {edu.period && edu.period !== 'Completed' ? `${edu.period} ` : ''}
                    {edu.score && <span className="font-semibold text-zinc-700">({edu.score})</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Extracurricular Activities */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-heading">
              Leadership &amp; Technical Contests
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-zinc-900">
                    Activity Head <span className="font-normal text-zinc-600">| Cisco NetAcad (Cisco Networking Academy)</span>
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-500">500+ Students</span>
                </div>
                <ul className="list-disc list-inside text-zinc-600 space-y-0.5 mt-0.5">
                  <li>Helped establish and develop the Cisco Networking club from its early stages.</li>
                  <li>Conducted Cisco Networking boot camps and managed technical events with participation from 500+ students.</li>
                  <li>Cultivated leadership, coordination, event management, and technical communication proficiencies.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-zinc-900">
                    Oracle Hacks! Hackathon <span className="font-normal text-zinc-600">| Participant &amp; Innovator</span>
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-500">Hedera Hashgraph</span>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  Participated in Oracle Hacks! focused on developing applications and tools using APIs and data sources for smart contract applications on Hedera Hashgraph. Submitted idea and progressed through hackathon selection process.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div>
                  <strong className="text-zinc-900">Codeliedoscope 2023:</strong>{' '}
                  <span className="text-zinc-600">Participant in Unleashing ORCM-NEXT algorithmic challenge.</span>
                </div>
                <div>
                  <strong className="text-zinc-900">BizQuezt / TechQuezt:</strong>{' '}
                  <span className="text-zinc-600">Contestant in AI, Machine Learning, code analysis &amp; output evaluation.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Languages */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-heading">
              Certifications &amp; Languages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <strong className="text-zinc-900">Diploma in French Language:</strong>{' '}
                <span className="text-zinc-600">Savitribai Phule Pune University (SPPU)</span>
              </div>
              <div>
                <strong className="text-zinc-900">Cisco Networking Academy:</strong>{' '}
                <span className="text-zinc-600">Networking and Technical Activities Certification</span>
              </div>
            </div>
          </div>

          {/* Volunteering & Community Engagement */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-heading">
              Social Responsibility &amp; Volunteering
            </h2>
            <div className="text-xs">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-zinc-900">
                  Volunteer <span className="font-normal text-zinc-600">| Nature Lovers (in association with Lions Club Pune)</span>
                </h3>
                <span className="text-[11px] font-mono text-zinc-500">NEP Initiative</span>
              </div>
              <ul className="list-disc list-inside text-zinc-600 space-y-0.5 mt-0.5">
                <li>Participated in Nature and Environment Program (NEP) focused on environmental awareness among school students.</li>
                <li>Conducted hands-on practical activities in rainwater harvesting, composting, sapling plantation, and ecological conservation.</li>
                <li>Honed teamwork, cross-functional coordination, time management, and interpersonal leadership skills.</li>
              </ul>
            </div>
          </div>

          {/* Core Interests */}
          <div className="pt-2 border-t border-zinc-200 text-xs">
            <strong className="text-zinc-900">Interests &amp; Pursuits:</strong>{' '}
            <span className="text-zinc-600">
              Learning Foreign Languages, Entrepreneurship, Quantitative Finance &amp; Markets, Technology, and Modern Software Engineering.
            </span>
          </div>


        </div>
      </div>
    </div>
  );
};

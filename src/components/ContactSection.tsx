import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  ExternalLink
} from 'lucide-react';
import { ProfileData } from '../types';

interface ContactSectionProps {
  profile: ProfileData;
  onOpenDeployGuide: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onOpenDeployGuide }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        formData.subject || `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-black border-t border-zinc-800/80 text-zinc-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Let's Connect
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Get In Touch
          </p>
          <p className="text-zinc-400 text-sm">
            Interested in collaboration, engineering roles, or have questions? Feel free to send a direct message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <h3 className="text-lg font-bold text-white font-heading mb-1">
                  Contact Information
                </h3>
                <p className="text-xs text-zinc-400">
                  Direct communication channels.
                </p>
              </div>

              {/* Email Card */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-white shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] text-zinc-400 block">Direct Email</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-xs font-semibold font-mono text-zinc-200 hover:text-white truncate block"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-xs shrink-0 cursor-pointer"
                  title="Copy email address"
                  id="btn-copy-email"
                >
                  {copiedEmail ? (
                    <span className="flex items-center gap-1 text-white font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copied</span>
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-400 block">Location</span>
                  <span className="text-xs font-semibold text-zinc-200">
                    {profile.location} (Remote / Onsite)
                  </span>
                </div>
              </div>

              {/* GitHub Pages Host Quick Guide Card */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Github className="w-4 h-4" />
                    GitHub Pages Hosting
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">Free &amp; Verified</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Step-by-step instructions to host your custom React portfolio on GitHub Pages with automated CI/CD actions.
                </p>
                <button
                  onClick={onOpenDeployGuide}
                  className="w-full py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open GitHub Deployment Guide</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-zinc-900 flex items-center gap-3">
                <span className="text-xs text-zinc-500 font-medium">Follow:</span>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900 hover:bg-white hover:text-black text-zinc-300 transition-colors border border-zinc-800"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900 hover:bg-white hover:text-black text-zinc-300 transition-colors border border-zinc-800"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form in Monochrome */}
          <div className="lg:col-span-7 bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Message Prepared!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                  Your mail client has been opened. You can also write directly to{' '}
                  <strong className="text-white font-mono">{profile.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-white border border-zinc-700 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading mb-1">
                    Send a Message
                  </h3>
                  <p className="text-xs text-zinc-400 mb-4">
                    Fill out the form below to begin a conversation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Your Name <span className="text-zinc-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Your Email <span className="text-zinc-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Message <span className="text-zinc-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hello Shubham, I would like to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  id="btn-submit-contact"
                >
                  {isSubmitting ? (
                    <span>Opening Mail Client...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-black" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { X, Save, RotateCcw, User } from 'lucide-react';
import { PortfolioContent, ProfileData } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioContent;
  onSave: (updatedData: PortfolioContent) => void;
  onReset: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}) => {
  const [profile, setProfile] = useState<ProfileData>({ ...data.profile });

  if (!isOpen) return null;

  const handleChange = (field: keyof ProfileData, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave({
      ...data,
      profile,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-black border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Customize Profile
              </h3>
              <p className="text-xs text-zinc-400">
                Update your name, bio, social links, and contact information.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-zinc-300 mb-1">Display Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block font-medium text-zinc-300 mb-1">Professional Role</label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-zinc-300 mb-1">Tagline (Hero Subheading)</label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block font-medium text-zinc-300 mb-1">About Bio</label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-zinc-200 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-zinc-300 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block font-medium text-zinc-300 mb-1">Phone / WhatsApp</label>
              <input
                type="text"
                value={profile.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-zinc-300 mb-1">GitHub Username</label>
              <input
                type="text"
                value={profile.githubUsername}
                onChange={(e) => {
                  const val = e.target.value;
                  handleChange('githubUsername', val);
                  handleChange('githubUrl', `https://github.com/${val}`);
                }}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block font-medium text-zinc-300 mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={profile.linkedinUrl || ''}
                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                placeholder="https://www.linkedin.com/in/..."
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-zinc-300 mb-1">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block font-medium text-zinc-300 mb-1">Years Coding</label>
              <input
                type="text"
                value={profile.yearsOfExperience}
                onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-1.5 text-zinc-200 text-center"
              />
            </div>
            <div>
              <label className="block font-medium text-zinc-300 mb-1">Projects Built</label>
              <input
                type="text"
                value={profile.completedProjects}
                onChange={(e) => handleChange('completedProjects', e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-1.5 text-zinc-200 text-center"
              />
            </div>
            <div>
              <label className="block font-medium text-zinc-300 mb-1">Open To Work</label>
              <button
                type="button"
                onClick={() => handleChange('availableForHire', !profile.availableForHire)}
                className={`w-full py-1.5 rounded-xl font-semibold border cursor-pointer ${
                  profile.availableForHire
                    ? 'bg-white text-black border-white'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                }`}
              >
                {profile.availableForHire ? 'Yes (Open)' : 'No'}
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-black border-t border-zinc-800 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all profile data to default?')) {
                onReset();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

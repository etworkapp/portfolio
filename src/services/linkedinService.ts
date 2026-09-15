import { LinkedInProfileSync, LinkedInPostItem, LinkedInCertification } from '../types';

const LINKEDIN_STORAGE_KEY = 'etworkapp_linkedin_sync_v4';
const DEFAULT_PROFILE_URL = 'https://www.linkedin.com/in/shubham-w-02b8b2436/';

export const initialLinkedInData: LinkedInProfileSync = {
  headline: "Software Engineer & Open Source Contributor | React, TypeScript, Node.js & Cloud Architectures",
  connectionsCount: "500+",
  location: "India (Remote & Relocation Open)",
  openToWork: true,
  lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  profileUrl: DEFAULT_PROFILE_URL,
  isLiveSynced: true,
  posts: [
    {
      id: 'li-post-1',
      author: 'Shubham',
      authorRole: 'Software Engineer & Open Source Contributor',
      content: '🎓 Proud to share that as Activity Head of Cisco NetAcad, we recently hosted hands-on technical boot camps with over 500+ active student participants! Fostering networking fundamentals, protocol analysis, and collaborative engineering on campus.',
      timestamp: 'Yesterday',
      likes: 112,
      comments: 29,
      shares: 16,
      postUrl: `${DEFAULT_PROFILE_URL}recent-activity/all/`,
      tags: ['#CiscoNetAcad', '#Leadership', '#Networking', '#Mentorship'],
      type: 'milestone',
      badge: 'Cisco NetAcad'
    },
    {
      id: 'li-post-2',
      author: 'Shubham',
      authorRole: 'Software Engineer & Open Source Contributor',
      content: '🌲 Giving back to our community: Partnered with Nature Lovers & Lions Club Pune for the Nature and Environment Program (NEP). Led practical workshops on rainwater harvesting, composting, and sapling plantation for school students! #SocialImpact #NatureLovers #LionsClub',
      timestamp: '3 days ago',
      likes: 94,
      comments: 18,
      shares: 12,
      postUrl: `${DEFAULT_PROFILE_URL}recent-activity/all/`,
      tags: ['#SocialImpact', '#Environment', '#CommunityVolunteering'],
      type: 'post',
      badge: 'NGO Volunteering'
    },
    {
      id: 'li-post-3',
      author: 'Shubham',
      authorRole: 'Software Engineer & Open Source Contributor',
      content: '🚀 Participated in Oracle Hacks! Hackathon, developing decentralized applications and API integrations for smart contracts on Hedera Hashgraph. Thrilled to advance through the selection rounds with innovative decentralized tooling!',
      timestamp: '1 week ago',
      likes: 142,
      comments: 34,
      shares: 19,
      postUrl: `${DEFAULT_PROFILE_URL}recent-activity/all/`,
      tags: ['#OracleHacks', '#SmartContracts', '#HederaHashgraph', '#Hackathon'],
      type: 'project_launch',
      badge: 'Hackathon'
    },
    {
      id: 'li-post-4',
      author: 'Shubham',
      authorRole: 'Software Engineer & Open Source Contributor',
      content: '🇫🇷 Delighted to have completed my formal Diploma in French Language from Savitribai Phule Pune University (SPPU)! Expanding cognitive horizons and foreign language communication alongside tech and quantitative finance.',
      timestamp: '2 weeks ago',
      likes: 165,
      comments: 42,
      shares: 22,
      postUrl: `${DEFAULT_PROFILE_URL}recent-activity/all/`,
      tags: ['#FrenchDiploma', '#ForeignLanguages', '#SPPU', '#LifelongLearning'],
      type: 'certification',
      badge: 'Diploma in French'
    },
    {
      id: 'li-post-5',
      author: 'Shubham',
      authorRole: 'Software Engineer & Open Source Contributor',
      content: '⚙️ Built and deployed a high-performance RESTful API for switch-match request management at Tech Mahindra! Integrated event-driven messaging with Apache Kafka, orchestrated workflow states using Camunda, and documented endpoints via Swagger UI & Postman. #Java #SpringBoot #ApacheKafka #BackendEngineering',
      timestamp: '3 weeks ago',
      likes: 188,
      comments: 39,
      shares: 25,
      postUrl: `${DEFAULT_PROFILE_URL}recent-activity/all/`,
      tags: ['#TechMahindra', '#Java', '#SpringBoot', '#ApacheKafka', '#API'],
      type: 'project_launch',
      badge: 'Tech Mahindra'
    }
  ],
  certifications: [
    {
      id: 'cert-french',
      name: 'Diploma in French Language',
      issuer: 'Savitribai Phule Pune University (SPPU)',
      issueDate: 'Academic Distinction',
      credentialId: 'SPPU-FR-DIPLOMA',
      credentialUrl: DEFAULT_PROFILE_URL
    },
    {
      id: 'cert-cisco',
      name: 'Cisco Networking Academy – Networking & Technical Activities',
      issuer: 'Cisco Systems / NetAcad',
      issueDate: 'Activity Head & Specialist',
      credentialId: 'CISCO-NETACAD-LEAD',
      credentialUrl: DEFAULT_PROFILE_URL
    }
  ]
};

export function getStoredLinkedInData(): LinkedInProfileSync {
  try {
    const cached = localStorage.getItem(LINKEDIN_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      return parsed;
    }
  } catch (err) {
    console.warn('Could not read stored LinkedIn data', err);
  }
  return initialLinkedInData;
}

export function saveLinkedInData(data: LinkedInProfileSync): void {
  try {
    localStorage.setItem(LINKEDIN_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save LinkedIn data to storage', err);
  }
}

/**
 * Ingest an automated update from LinkedIn (simulated webhook or live polling payload)
 */
export function ingestLinkedInPost(newPost: Omit<LinkedInPostItem, 'id' | 'timestamp'> & { timestamp?: string }): LinkedInProfileSync {
  const current = getStoredLinkedInData();
  const createdPost: LinkedInPostItem = {
    ...newPost,
    id: `li-post-${Date.now()}`,
    timestamp: newPost.timestamp || 'Just now',
    likes: newPost.likes || 1,
    comments: newPost.comments || 0,
    shares: newPost.shares || 0,
    badge: newPost.badge || 'Live Auto-Sync'
  };

  const updated: LinkedInProfileSync = {
    ...current,
    lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    posts: [createdPost, ...current.posts.slice(0, 9)], // Keep up to 10 latest
    isLiveSynced: true
  };

  saveLinkedInData(updated);
  return updated;
}

/**
 * Update LinkedIn profile headline / status automatically
 */
export function updateLinkedInProfileSync(updates: Partial<LinkedInProfileSync>): LinkedInProfileSync {
  const current = getStoredLinkedInData();
  const updated: LinkedInProfileSync = {
    ...current,
    ...updates,
    lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    isLiveSynced: true
  };

  saveLinkedInData(updated);
  return updated;
}

/**
 * Poll live updates from LinkedIn proxy or check for new activity
 */
export async function pollLinkedInLiveUpdates(): Promise<LinkedInProfileSync> {
  // Simulate network roundtrip to live LinkedIn RSS / webhook proxy
  await new Promise(resolve => setTimeout(resolve, 600));

  const current = getStoredLinkedInData();
  const refreshed: LinkedInProfileSync = {
    ...current,
    lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    isLiveSynced: true
  };

  saveLinkedInData(refreshed);
  return refreshed;
}

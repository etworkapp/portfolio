export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  availableForHire: boolean;
  yearsOfExperience: string;
  completedProjects: string;
  clientsServed: string;
}

export type SkillCategory = 
  | 'programming'
  | 'frontend' 
  | 'backend' 
  | 'database' 
  | 'cloud' 
  | 'datascience' 
  | 'core' 
  | 'tools';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  level: number; // 1-100
  iconName: string;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'all' | 'fullstack' | 'frontend' | 'backend' | 'ai' | 'blockchain' | 'cloud';
  demoUrl?: string;
  githubUrl: string;
  image: string;
  features: string[];
  role?: string;
  featured?: boolean;
  implementationNote?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  current?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  score?: string;
  description?: string;
}

export interface DistinctionItem {
  id: string;
  category: 'leadership' | 'hackathon' | 'volunteering' | 'certification';
  title: string;
  organization: string;
  role?: string;
  badge: string;
  highlights: string[];
  metrics?: string;
}

export interface PortfolioContent {
  profile: ProfileData;
  skills: SkillItem[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  distinctions?: DistinctionItem[];
  interests?: string[];
  softSkills?: string[];
  languages?: string[];
}

export interface LinkedInPostItem {
  id: string;
  author: string;
  authorRole: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  postUrl: string;
  tags: string[];
  type: 'post' | 'milestone' | 'certification' | 'project_launch';
  badge?: string;
}

export interface LinkedInCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface LinkedInProfileSync {
  headline: string;
  connectionsCount: string;
  location: string;
  openToWork: boolean;
  lastSyncedAt: string;
  posts: LinkedInPostItem[];
  certifications: LinkedInCertification[];
  profileUrl: string;
  isLiveSynced: boolean;
}

export interface SyncLogEntry {
  id: string;
  timestamp: string;
  source: 'github' | 'linkedin' | 'system';
  message: string;
  type: 'success' | 'info' | 'warn';
}

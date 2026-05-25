export interface Project {
  id: string;
  name: string;
  description: string;
  importantDetails?: string;
  tech: string[];
  status: string;
  links: {
    github: string;
    live: string;
  };
  visible?: boolean;
  category?: string;
  imageUrl?: string;
  gallery?: string[];
  pinned?: boolean;
  hideCode?: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  enabled: boolean;
}

export interface Settings {
  theme: string;
  animationsEnabled: boolean;
  seoTitle: string;
  seoDescription: string;
  resumeUrl?: string;
  githubUsername?: string;
}

export interface Skill {
  name: string;
  level: number;
  category?: string;
  status?: string;
  visible?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  timeline: string;
  summary: string;
  visible?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  timeline: string;
  summary: string;
  visible?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  visible?: boolean;
}

export interface PortfolioData {
  hero: {
    heading: string;
    subtitle: string;
    subtext?: string;
  };
  about: {
    name: string;
    role: string;
    status: string;
    location: string;
    specialization: string;
    bio: string;
    avatarUrl?: string;
    summaryCards?: {
      title: string;
      description: string;
    }[];
  };
  skills: Skill[];
  projects: Project[];
  socials: SocialLink[];
  experience: Experience[];
  education: Education[];
  testimonials: Testimonial[];
  settings: Settings;
  stats?: {
    repos: number;
    commits: number;
    prs: number;
  };
  leetcode?: {
    enabled: boolean;
    username: string;
    solvedCount: number;
  };
  devices?: Device[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface Device {
  id: string;
  ip: string;
  browser: string;
  lastLogin: string;
  isTrusted: boolean;
}

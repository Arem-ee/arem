export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  author: {
    name: string;
    email: string;
    jobTitle: string;
    image: string;
    sameAs: string[];
  };
  keywords: string[];
}

export interface Metadata {
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Strength {
  title: string;
  description: string;
  icon: string;
}

export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  duration: string;
  summary: string;
  achievements: string[];
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  image: string;
  technologies: string[];
  category: ProjectCategory;
  metrics?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export type ProjectCategory =
  | "Frontend"
  | "Backend"
  | "Full Stack"
  | "AI"
  | "Mobile"
  | "DevOps";

export interface ProjectDetail extends Project {
  problem: string;
  goals: string[];
  architecture: string;
  technicalDecisions: { decision: string; rationale: string }[];
  challenges: { challenge: string; solution: string }[];
  results: string[];
  lessonsLearned: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Article {
  title: string;
  slug: string;
  date: string;
  readingTime: string;
  summary: string;
  url?: string;
}

export interface BlogPost extends Article {
  author: string;
  coverImage: string;
  content: string;
  headings: { id: string; text: string; level: number }[];
  relatedSlugs: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  review: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AnalyticsEvent {
  type: "page_view" | "article_read" | "contact_submit" | "project_view" | "resume_download";
  payload: Record<string, string | number>;
  timestamp: number;
}

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  updatedAt?: string;
}

export interface ResumeExperience {
  company: string;
  location: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface ResumeEducation {
  degree: string;
  school: string;
  period: string;
  details?: string;
}

export interface ResumeSkillCategory {
  category: string;
  items: string[];
}

export interface ResumeLanguage {
  language: string;
  proficiency: string;
}

export interface ResumeData {
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkillCategory[];
  certifications: string[];
  languages: ResumeLanguage[];
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
}

/**
 * Represents a personal or side project in the portfolio
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  photo?: string;
  thumbnail?: string;
  category?: string;
  techStack: string[];
  features?: string[];
  links?: {
    github?: string;
    demo?: string;
    playstore?: string;
    appstore?: string;
    website?: string;
  };
  startDate?: string;
  endDate?: string;
  isFeatured?: boolean;
  order?: number;
}

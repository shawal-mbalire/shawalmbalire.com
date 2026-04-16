/**
 * Research entry model
 */
export interface ResearchEntry {
  /** Unique identifier */
  id: string;
  
  /** Research title */
  title: string;
  
  /** Short description */
  description: string;
  
  /** Conference or journal name */
  venue: string;
  
  /** Location of publication/presentation */
  location: string;
  
  /** Publication date */
  date: string;
  
  /** Year for timeline grouping */
  year: number;
  
  /** Type of publication */
  type?: string;
  
  /** Key highlights/achievements */
  highlights?: string[];
  
  /** Link to publication */
  links: {
    ieee?: string;
    doi?: string;
    pdf?: string;
    website?: string;
  };
  
  /** Research tags/skills */
  skills: string[];
  
  /** Order in timeline (lower = earlier) */
  order: number;
}

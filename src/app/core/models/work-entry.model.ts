/**
 * Represents a work experience entry in the portfolio
 */
export interface WorkEntry {
  id?: number;
  title: string;
  description: string;
  photo?: string;
  employer?: string;
  company: string;
  tags?: string;
  type?: string;
  location?: string;
  startDate: string;
  endDate: string;
  duration: string;
  workMode?: string;
  skills?: string[];
  responsibilities?: string[];
}

/**
 * Collection of work entries
 */
export interface WorkEntryList {
  workEntries: WorkEntry[];
}

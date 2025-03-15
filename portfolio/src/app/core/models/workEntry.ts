export interface WorkEntry {
  id?: number;                 // Unique identifier for the work entry
  title: string;              // Job title
  description: string;        // Description of the job
  photo?: string;              // URL or path to a photo (optional)
  employer?: string;           // Name of the company or employer
  company : string;           // Name of the company or employer
  tags?: string;               // Tags related to the job (e.g., "Internship", "Hybrid")
  type?: string;              // Type of employment (e.g., Internship, Part-time, Freelance)
  location?: string;          // Location of the job
  startDate: string;          // Start date of the job
  endDate: string;            // End date of the job
  duration: string;           // Duration of the job (e.g., 8 months)
  workMode?: string;          // Work mode (e.g., Hybrid, On-site, Remote)
  skills?: string[];          // Skills acquired during the job
  responsibilities?: string[]; // Responsibilities in the role
}

export interface WorkEntryList {
  workEntries: WorkEntry[];  // Array of work entries
}


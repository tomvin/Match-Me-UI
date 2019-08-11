export type NewJob = {
  id: number;
  title: string;
  description: string;
  companyName: string;
  category: string;
  softSkills: string[];
  degrees: string[];
  competence: number;
  datePosted: Date;
  salary: string;
}
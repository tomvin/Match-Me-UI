import { Company } from "./Company";

export interface Job {
  id: number;
  company: Company;
  title: string;
  description: string;
  skills: string[];
}
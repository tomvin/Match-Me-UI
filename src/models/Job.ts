import { Company } from './Company';
import { Education } from './Education';

export interface Job {
  _id: string;
  company: Company;
  name: string;
  description: string;
  education: Education[];
}
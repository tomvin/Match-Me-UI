import { ICompany } from './Company';
import { IEducation } from './Education';
import { IUser } from './User';
import { ICompetence } from './Competence';

export interface IJob {
  _id: string;
  company: ICompany;
  name: string;
  description: string;
  location: string;
  typeofwork: number;
  salary: number;
  education: IEducation[];
  jobSeekerInterest: IUser[];
  companyInterest: IUser[];
  completeJobSeekerMatch: IUser[];
  competence: ICompetence[];
}

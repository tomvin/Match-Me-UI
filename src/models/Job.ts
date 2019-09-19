import { ICompany } from './Company';
import { IEducation } from './Education';
import { IUser } from './User';

export interface IJob {
  _id: string;
  company: ICompany;
  name: string;
  description: string;
  education: IEducation[];
  jobSeekerInterest: IUser[];
  companyInterest: IUser[];
  completeJobSeekerMatch: IUser[];
}

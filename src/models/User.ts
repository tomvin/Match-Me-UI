import { ICompany } from './Company';
import { IJobSeeker } from './JobSeeker';

export interface IUser {
  _id: number;
  email: string;
  company: ICompany;
  jobSeeker: IJobSeeker;
  isCompany: boolean;
}
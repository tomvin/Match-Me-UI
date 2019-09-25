import { ICompany } from './Company';
import { IJobSeeker } from './JobSeeker';

export interface IUser {
  _id: string;
  email: string;
  company: ICompany | undefined;
  jobSeeker: IJobSeeker | undefined;
  isCompany: boolean;
}
import { ICompany } from './Company';
import { IEducation } from './Education';

export interface IJob {
  _id: string;
  company: ICompany;
  name: string;
  description: string;
  education: IEducation[];
}
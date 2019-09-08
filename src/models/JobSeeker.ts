import { IEducation } from './Education';

export interface IJobSeeker {
  _id: number;
  name: string;
  phone: string;
  education: IEducation[];
}
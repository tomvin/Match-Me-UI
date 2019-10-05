import { IEducation } from './Education';
import { ICompetence } from './Competence';

export interface IJobSeeker {
  _id: number;
  name: string;
  phone: string;
  education: IEducation[];
  competence: ICompetence[];
  location: string;
  typeofwork: number;
  salary: number;
  education_p: number;
  competence_p: number;
  location_p: number;
  typeofwork_p: number;
  salary_p: number;
}
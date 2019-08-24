import { Job } from './Job';

export interface PotentialJobMatch {
  id: number;
  job: Job;
  matchPercentage: number;
}
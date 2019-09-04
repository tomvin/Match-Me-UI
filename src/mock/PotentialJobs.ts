import { IJobSeekerMatch } from "../models/JobSeekerMatch";
import { MOCK_JOBS } from "./Jobs";

export const MOCK_POTENTIAL_JOBS: IJobSeekerMatch[] = MOCK_JOBS.map((job, i) => ({
  id: i + 1,
  job: job,
  score: Math.trunc(Math.random() * (100 - 1) + 1)
}))
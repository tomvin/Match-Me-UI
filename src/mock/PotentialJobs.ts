import { IJobSeekerMatch } from "../models/JobSeekerMatch";
import { MOCK_JOBS } from "./Jobs";
import { IJob } from "../models/Job";

export const MOCK_POTENTIAL_JOBS: Partial<IJobSeekerMatch>[] = MOCK_JOBS.map((job, i) => ({
  id: i + 1,
  job: job as IJob,
  score: Math.trunc(Math.random() * (100 - 1) + 1)
}))
import { PotentialJobMatch } from "../models/PotentialJobMatch";
import { MOCK_JOBS } from "./Jobs";

export const MOCK_POTENTIAL_JOBS: PotentialJobMatch[] = MOCK_JOBS.map((job, i) => ({
  id: i + 1,
  job: job,
  matchPercentage: Math.trunc(Math.random() * (100 - 1) + 1)
}))
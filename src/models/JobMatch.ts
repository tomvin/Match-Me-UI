import { IUser } from "./User";

export interface IJobMatch {
  score: number;
  user: IUser;
}
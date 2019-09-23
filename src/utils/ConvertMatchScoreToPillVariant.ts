import { PillVariant } from '../modules/shared/components/Pill/Pill';

export const convertMatchScoreToPillVariant = (score: number): PillVariant => {
  if (score > .6) return 'green';
  else if (score > .3) return 'orange';
  else return 'red';
};
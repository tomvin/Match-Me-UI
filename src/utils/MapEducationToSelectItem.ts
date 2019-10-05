import { IEducation } from "../models/Education";
import { SelectItem } from '../modules/shared/components/Select/Select';

export const mapEducationToSelect = (education: IEducation): SelectItem<string> => ({
  value: education._id,
  label: `${education.level} : ${education.field}`
});

export const mapEducationsToSelect = (educations: IEducation[]): SelectItem<string>[] => {
  return educations.map<SelectItem<string>>(mapEducationToSelect);
};

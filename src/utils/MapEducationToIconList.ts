import { IconListItemVM } from '../modules/shared/components/IconList/IconListModels';
import { IEducation } from "../models/Education";

export const mapEducationToIconList = (educations: IEducation[]): IconListItemVM[] => {
  if (!educations) {
    return [];
  }

  return educations.map<IconListItemVM>(education => ({
    icon: 'graduation-cap',
    label: `${education.field} (${education.level})`
  }))
}
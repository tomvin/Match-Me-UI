import { ICompetence } from "../models/Competence";
import { IconListItemVM } from "../modules/shared/components/IconList/IconListModels";

export const mapCompetenceToIconList = (competences: ICompetence[]): IconListItemVM[] => {
  if (!competences) {
    return [];
  }

  return competences.map<IconListItemVM>(competence => ({
    icon: 'lightbulb',
    label: `${competence.skill} (${competence.level})`
  }))
}
import { ICompetence } from '../models/Competence';
import { SelectItem } from '../modules/shared/components/Select/Select';

export const mapCompetenceToSelect = (competence: ICompetence): SelectItem<string> => ({
  value: competence._id,
  label: `${competence.skill} : ${competence.level}`
});

export const mapCompetencesToSelect = (competences: ICompetence[]): SelectItem<string>[] => {
  return competences.map<SelectItem<string>>(mapCompetenceToSelect);
};

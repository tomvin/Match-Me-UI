import { SelectItem } from '../modules/shared/components/Select/Select';
import { TYPE_OF_WORK_SELECT_OPTIONS } from './TypeOfWorkSelectOptions';

export const mapTypeOfWorkToSelect = (typeOfWork: number): SelectItem<string> => {
  const option = TYPE_OF_WORK_SELECT_OPTIONS.find(t => t.value === typeOfWork);
  if (!option) {
    return {
      label: '',
      value: ''
    }
  }

  return option;
};

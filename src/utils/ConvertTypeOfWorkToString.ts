/**
 * Converts the `typeofwork` field on a `Jobseeker` / `Job` into the string
 * of what the number actually corresponds to. 
 * @param typeOfWork The `typeofwork` property on a `JobSeeker` or `Job`. 
 */
export const convertTypeOfWorkToString = (typeOfWork: number): string => {
  switch (typeOfWork) {
    case 1: return 'Full Time';
    case 2: return 'Part Time';
    case 3: return 'Full Time, Part Time';
    case 4: return 'Casual';
    case 5: return 'Casual, Full Time';
    case 6: return 'Part Time, Casual';
    case 7: return 'Full Time, Part Time, Casual';
    default: return 'Unknown';
  }
}
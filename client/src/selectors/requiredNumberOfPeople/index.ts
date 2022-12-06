import { createSelector } from 'reselect';
import { RootState } from 'store';

export const requiredNumberOfPeopleSelector = (state: RootState) =>
  state.RequiredNumberOfPeople;

export const requiredNumberOfPeopleListSelector = createSelector(
  requiredNumberOfPeopleSelector,
  (RequiredNumberOfPeople) => {
    return RequiredNumberOfPeople.requiredNumberOfPeople;
  }
);

/* export const staffShiftTypeSelector = createSelector(staffSelector, (Staff) => { */
/*   return Staff.shiftType; */
/* }); */
/**/
/* export const staffEmploymentStatusSelector = createSelector( */
/*   staffSelector, */
/*   (Staff) => { */
/*     return Staff.employmentStatus; */
/*   } */
/* ); */

export default requiredNumberOfPeopleSelector;

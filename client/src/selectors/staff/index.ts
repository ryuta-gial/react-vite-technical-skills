import { createSelector } from 'reselect';
import { RootState } from 'store';

export const staffSelector = (state: RootState) => state.Staff;

export const staffListSelector = createSelector(staffSelector, (Staff) => {
  return Staff.staff;
});

export const staffShiftTypeSelector = createSelector(staffSelector, (Staff) => {
  return Staff.shiftType;
});

export const staffEmploymentStatusSelector = createSelector(
  staffSelector,
  (Staff) => {
    return Staff.employmentStatus;
  }
);

export default staffSelector;

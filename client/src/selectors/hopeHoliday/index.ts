import { createSelector } from 'reselect';
import { RootState } from 'store';

export const hopeHolidaySelector = (state: RootState) => state.HopeHoliday;

export const hopeHolidayListSelector = createSelector(
  hopeHolidaySelector,
  (HopeHoliday) => {
    return HopeHoliday.hopeHoliday;
  }
);

export default hopeHolidayListSelector;

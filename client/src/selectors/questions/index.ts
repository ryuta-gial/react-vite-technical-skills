import { createSelector } from 'reselect';
import { RootState } from 'store';

export const questionsSelector = (state: RootState) => state.Questions;

export const questionsListSelector = createSelector(
  questionsSelector,
  (Questions) => {
    return Questions.data;
  }
);

export const questionsGroupSelector = createSelector(
  questionsSelector,
  (Questions) => {
    return Questions.queGroupNumber;
  }
);

export default questionsSelector;

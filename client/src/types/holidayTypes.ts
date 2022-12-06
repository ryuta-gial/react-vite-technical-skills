export const initialState: initialStateType = {
  holiday: [],
};

export type initialStateType = {
  holiday: holidayType[];
};

export type holidayType = {
  id: string;
  title: string;
  start: Date;
};

export type createHolidayType = {
  title: string;
  holiday: string;
};

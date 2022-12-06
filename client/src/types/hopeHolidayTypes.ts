export const initialState: initialStateType = {
  hopeHoliday: [],
};

export type initialStateType = {
  hopeHoliday: hopeHolidayType[];
};

export type hopeHolidayType = {
  id: number;
  staffId: number;
  hopeHoliday: string;
  staffHopeHoliday: string;
};

export type createHopeHolidayType = {
  staffId: number;
  hopeHoliday: string;
  staffHopeHoliday: string;
};

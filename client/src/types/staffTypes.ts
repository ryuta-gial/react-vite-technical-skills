export const initialState: initialStateType = {
  staff: [],
  employmentStatus: [],
  shiftType: [],
};

export type initialStateType = {
  staff: staffType[];
  employmentStatus: employmentStatusType[];
  shiftType: shiftType[];
};

export type editStaffType = {
  inputState: inputStaffType;
  staffId: string;
};

export type inputStaffType = {
  name: null | string;
  employmentStatus: null | string;
  shiftType: null | string;
};

export type staffType = {
  id: string;
  name: string;
  employmentStatus: string;
  shiftType: string;
};

export type employmentStatusType = {
  id: null | string;
  name: null | string;
};

export type shiftType = {
  id: string;
  name: string;
};

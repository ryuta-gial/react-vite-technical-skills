export const initialState: initialStateType = {
  requiredNumberOfPeople: [],
};

export type initialStateType = {
  requiredNumberOfPeople: requiredNumberOfPeopleType[];
};

export type requiredNumberOfPeopleType = {
  id: number;
  workDate: string;
  numberOfPeople: numberOfPeopleJsonType;
};

export type numberOfPeopleJsonType = {
  sumCount: number;
  numberOfPeople: numberOfPeopleType[];
};

export type numberOfPeopleType = {
  status: string;
  count: number;
};

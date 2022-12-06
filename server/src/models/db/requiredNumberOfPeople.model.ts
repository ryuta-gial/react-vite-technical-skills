export type RequiredNumberOfPeople = {
    id: number;
    workDate: string;
    numberOfPeople: NumberOfPeopleJsonType;
};

export type NumberOfPeopleJsonType = {
    sumCount: number;
    numberOfPeople: NumberOfPeopleType[];
};

export type NumberOfPeopleType = {
    status: string;
    count: number;
};

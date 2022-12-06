export const initialState: initialStateType = {
  data: [],
  answered_questions: [],
  queGroupNumber: 1,
};
export type initialStateType = {
  data: questionsType[];
  answered_questions: answerdQuestionType[];
  queGroupNumber: number;
};

export type answerdQuestionType = {
  id: string;
  text: string;
  answer: string;
};

export type questionsType = {
  id: number;
  dependent: string | null;
  group: number;
  title: string;
  text: string;
  answers: answersType[];
};

export type answersType = {
  answer: string;
  disabled: boolean;
  values: valuesType[];
};

export type valuesType = {
  category: string;
  title: string;
  score: string;
};

export type DEPENDENCY_ANSWER = {
  dependent: string;
};

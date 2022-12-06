export type formatQuestionsSheetsType = {
  data: questionsType[];
};

export type questionsType = {
  id: string;
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

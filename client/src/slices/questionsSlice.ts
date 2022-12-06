import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestions } from 'services/questionsApi';
import { initialState } from 'types/questionsType';

const questionsSlice = createSlice({
  name: 'Questions',
  initialState,
  reducers: {
    dependencyAnswerJudgment(state, action: PayloadAction<string>) {
      const t = action.payload;
      const s = state.data;
      //依存関係にある質問のdisabledをtrue or false にする。
      s.map((data) => {
        if (data.dependent === t) {
          data.answers.forEach((d) => {
            d.disabled = true;
          });
          return data;
        } else {
          data.answers.forEach((d) => {
            d.disabled = false;
          });
          return data;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data,
      };
    });
  },
});

export const { dependencyAnswerJudgment } = questionsSlice.actions;

export default questionsSlice.reducer;

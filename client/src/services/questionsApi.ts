import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialStateType } from '../types/questionsType';

const apiUrl = '/api/v1';

export const fetchQuestions = createAsyncThunk('get/questions', async () => {
  const { data } = await axios.get<initialStateType>(`${apiUrl}/questions`);
  return data;
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchHoliday,
  createHoliday,
  deleteHoliday,
} from 'services/holidayApi';
import { initialState, holidayType } from 'types/holidayTypes';

const holidaySlice = createSlice({
  name: 'Holiday',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHoliday.fulfilled, (state, action) => {
      return {
        ...state,
        holiday: action.payload.data,
      };
    });
    builder.addCase(
      createHoliday.fulfilled,
      (state, action: PayloadAction<holidayType>) => {
        alert('休園日の登録に成功しました');
        return {
          ...state,
          holiday: [...state.holiday, action.payload],
        };
      }
    );
    builder.addCase(
      deleteHoliday.fulfilled,
      (state, action: PayloadAction<string>) => {
        return {
          ...state,
          holiday: state.holiday.filter((item) => item.id !== action.payload),
        };
      }
    );
  },
});

export default holidaySlice.reducer;

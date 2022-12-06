import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchHopeHoliday,
  createHopeHoliday,
  deleteHopeHoliday,
} from 'services/hopeHolidayApi';
import { initialState, hopeHolidayType } from 'types/hopeHolidayTypes';

const holidaySlice = createSlice({
  name: 'HopeHoliday',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHopeHoliday.fulfilled, (state, action) => {
      return {
        ...state,
        hopeHoliday: action.payload.data,
      };
    });
    builder.addCase(
      createHopeHoliday.fulfilled,
      (state, action: PayloadAction<hopeHolidayType>) => {
        return {
          ...state,
          hopeHoliday: [...state.hopeHoliday, action.payload],
        };
      }
    );
    builder.addCase(
      deleteHopeHoliday.fulfilled,
      (state, action: PayloadAction<{ id: number }>) => {
        return {
          ...state,
          hopeHoliday: state.hopeHoliday.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }
    );
  },
});

export default holidaySlice.reducer;

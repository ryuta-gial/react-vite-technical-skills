import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { holidayType, createHolidayType } from 'types/holidayTypes';
const apiUrl = '/api/v1';

export const fetchHoliday = createAsyncThunk('get/holiday', async () => {
  const { data } = await axios.get<holidayType[]>(`${apiUrl}/holiday`);
  return { data: data };
});

export const createHoliday = createAsyncThunk(
  'post/holiday',
  async (arg: createHolidayType) => {
    try {
      const response = await axios.post<holidayType>(`${apiUrl}/holiday`, arg);
      return response.data;
    } catch (err: any) {
      return err.response;
    }
  }
);

export const deleteHoliday = createAsyncThunk(
  'delete/holiday',
  async (arg: string) => {
    try {
      await axios.delete(`${apiUrl}/holiday/${arg}`);
      return arg;
    } catch (err: any) {
      return err.response;
    }
  }
);

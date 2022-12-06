import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { hopeHolidayType, createHopeHolidayType } from 'types/hopeHolidayTypes';
const apiUrl = '/api/v1';

export const fetchHopeHoliday = createAsyncThunk(
  'get/hopeHoliday',
  async () => {
    const { data } = await axios.get<hopeHolidayType[]>(
      `${apiUrl}/hopeHoliday`
    );
    return { data: data };
  }
);

export const createHopeHoliday = createAsyncThunk(
  'post/hopeHoliday',
  async (arg: createHopeHolidayType) => {
    try {
      const response = await axios.post<hopeHolidayType>(
        `${apiUrl}/hopeHoliday`,
        arg
      );
      return response.data;
    } catch (err: any) {
      return err.response;
    }
  }
);

export const deleteHopeHoliday = createAsyncThunk(
  'delete/hopeHoliday',
  async (arg: createHopeHolidayType) => {
    try {
      const response = await axios.delete<number>(`${apiUrl}/hopeHoliday`, {
        data: arg,
      });
      return response.data;
    } catch (err: any) {
      return err.response;
    }
  }
);

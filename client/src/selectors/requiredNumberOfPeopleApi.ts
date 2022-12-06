import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { requiredNumberOfPeopleType } from 'types/requiredNumberOfPeopleTypes';
const apiUrl = '/api/v1';

export const fetchRequiredNumberOfPeople = createAsyncThunk(
  'get/requiredNumberOfPeople',
  async () => {
    const { data } = await axios.get<requiredNumberOfPeopleType[]>(
      `${apiUrl}/requiredNumberOfPeople`
    );
    return { data: data };
  }
);

/* export const createHoliday = createAsyncThunk( */
/*   'post/holiday', */
/*   async (arg: createHolidayType) => { */
/*     try { */
/*       const response = await axios.post<holidayType>(`${apiUrl}/holiday`, arg); */
/*       return response.data; */
/*     } catch (err) { */
/*       return err.response; */
/*     } */
/*   } */
/* ); */

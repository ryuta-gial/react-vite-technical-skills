import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  staffType,
  inputStaffType,
  employmentStatusType,
  shiftType,
  editStaffType,
} from '../types/staffTypes';
const apiUrl = '/api/v1';

export const fetchStaff = createAsyncThunk('get/staff', async () => {
  const { data } = await axios.get<staffType[]>(`${apiUrl}/staff`);
  return { data: data };
});

export const fetchStaffEmploymentStatus = createAsyncThunk(
  'get/EmploymentStatus',
  async () => {
    const { data } = await axios.get<employmentStatusType[]>(
      `${apiUrl}/staff/employmentstatus`
    );
    return { data: data };
  }
);

export const fetchShiftType = createAsyncThunk('get/ShiftType', async () => {
  const { data } = await axios.get<shiftType[]>(`${apiUrl}/staff/shifttype`);
  return { data: data };
});

export const createStaff = createAsyncThunk(
  'post/staff',
  async (arg: inputStaffType) => {
    try {
      const response = await axios.post(`${apiUrl}/staff`, arg);
      return response.data;
    } catch (err: any) {
      return err.response;
    }
  }
);

export const editStaff = createAsyncThunk(
  'put/staff',
  async (arg: editStaffType, thunkAPI) => {
    const { inputState: data, staffId: id } = arg;
    try {
      const response = await axios.put<staffType>(
        `${apiUrl}/staff/${id}`,
        data
      );
      return response.data;
    } catch (err: any) {
      return err.response;
    }
  }
);

export const deleteStaff = createAsyncThunk(
  'delete/staff',
  async (arg: string) => {
    try {
      const response = await axios.delete<string>(`${apiUrl}/staff/${arg}`);
      return response.data;
    } catch (err: any) {
      return err.response;
    }
  }
);

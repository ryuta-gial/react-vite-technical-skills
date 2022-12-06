import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchStaff,
  fetchStaffEmploymentStatus,
  fetchShiftType,
  createStaff,
  editStaff,
  deleteStaff,
} from 'services/staffApi';
import { staffType, initialState } from 'types/staffTypes';

const staffSlice = createSlice({
  name: 'Staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStaff.fulfilled, (state, action) => {
      return {
        ...state,
        staff: action.payload.data,
      };
    });
    builder.addCase(fetchStaffEmploymentStatus.fulfilled, (state, action) => {
      return {
        ...state,
        employmentStatus: action.payload.data,
      };
    });
    builder.addCase(fetchShiftType.fulfilled, (state, action) => {
      return {
        ...state,
        shiftType: action.payload.data,
      };
    });
    builder.addCase(
      createStaff.fulfilled,
      (state, action: PayloadAction<staffType>) => {
        return {
          ...state,
          //一番上に追加
          //staff: [action.payload, ...state.staff],
          staff: [...state.staff, action.payload],
        };
      }
    );
    builder.addCase(
      editStaff.fulfilled,
      (state, action: PayloadAction<staffType>) => {
        return {
          ...state,
          staff: state.staff.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        };
      }
    );
    builder.addCase(
      deleteStaff.fulfilled,
      (state, action: PayloadAction<{ id: string }>) => {
        return {
          ...state,
          staff: state.staff.filter((item) => item.id !== action.payload.id),
        };
      }
    );
  },
});

//export const { addTask, doneTask, setEditMode, editTask, deleteTask } = staffSlice.actions;

export default staffSlice.reducer;

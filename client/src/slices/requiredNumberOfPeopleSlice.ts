import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRequiredNumberOfPeople } from 'services/requiredNumberOfPeopleApi';
import {
  requiredNumberOfPeopleType,
  initialState,
} from 'types/requiredNumberOfPeopleTypes';

const RequiredNumberOfPeopleSlice = createSlice({
  name: 'RequiredNumberOfPeople',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRequiredNumberOfPeople.fulfilled, (state, action) => {
      return {
        ...state,
        requiredNumberOfPeople: action.payload.data,
      };
    });
    /* builder.addCase(fetchStaffEmploymentStatus.fulfilled, (state, action) => { */
    /*   return { */
    /*     ...state, */
    /*     employmentStatus: action.payload.data, */
    /*   }; */
    /* }); */
    /* builder.addCase(fetchShiftType.fulfilled, (state, action) => { */
    /*   return { */
    /*     ...state, */
    /*     shiftType: action.payload.data, */
    /*   }; */
    /* }); */
    /* builder.addCase( */
    /*   createStaff.fulfilled, */
    /*   (state, action: PayloadAction<staffType>) => { */
    /*     return { */
    /*       ...state, */
    /*       //一番上に追加 */
    /*       //staff: [action.payload, ...state.staff], */
    /*       staff: [...state.staff, action.payload], */
    /*     }; */
    /*   } */
    /* ); */
    /* builder.addCase( */
    /*   editStaff.fulfilled, */
    /*   (state, action: PayloadAction<staffType>) => { */
    /*     return { */
    /*       ...state, */
    /*       staff: state.staff.map((item) => */
    /*         item.id === action.payload.id ? action.payload : item */
    /*       ), */
    /*     }; */
    /*   } */
    /* ); */
    /* builder.addCase( */
    /*   deleteStaff.fulfilled, */
    /*   (state, action: PayloadAction<{ id: string }>) => { */
    /*     return { */
    /*       ...state, */
    /*       staff: state.staff.filter((item) => item.id !== action.payload.id), */
    /*     }; */
    /*   } */
    /* ); */
  },
});

//export const { addTask, doneTask, setEditMode, editTask, deleteTask } = staffSlice.actions;

export default RequiredNumberOfPeopleSlice.reducer;

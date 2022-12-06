import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  Reducer,
  AnyAction,
} from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import Questions_Reducer from 'slices/questionsSlice';
import Staff_Reducer from 'slices/staffSlice';
import Holiday_Reducer from 'slices/holidaySlice';
import HopeHoliday_Reducer from 'slices/hopeHolidaySlice';
import RequiredNumberOfPeople_Reducer from 'slices/requiredNumberOfPeopleSlice';

//すべてのステートをまとめる
const addReducer = combineReducers({
  Questions: Questions_Reducer,
  Staff: Staff_Reducer,
  Holiday: Holiday_Reducer,
  HopeHoliday: HopeHoliday_Reducer,
  RequiredNumberOfPeople: RequiredNumberOfPeople_Reducer,
});

export type RootState = ReturnType<typeof addReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'counter/logout') {
    state = {} as RootState;
  }
  return addReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const mySelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export default store;

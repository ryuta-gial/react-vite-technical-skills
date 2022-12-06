import React from 'react';
import Questions from 'features/Questions';
import Modal from 'features/Form';
import FormInput from 'features/Staff/StaffInput';
import StaffList from 'features/Staff';
import Holiday from 'features/Holiday';
import HopeHoliday from 'features/HopeHoliday';
import RequiredNumberOfPeople from 'features/RequiredNumberOfPeople';

import Menu from 'features/Manu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  const MemoizedFormInput = React.memo(FormInput);
  const MemoizedStaffList = React.memo(StaffList);
  const MemoizedHoliday = React.memo(Holiday);
  const MemoizedHopeHoliday = React.memo(HopeHoliday);
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/addStaff' exact>
            <Menu>
              <MemoizedFormInput />
              <MemoizedStaffList />
            </Menu>
          </Route>
          <Route path='/holiday' exact>
            <Menu>
              <MemoizedHoliday />
            </Menu>
          </Route>
          <Route path='/hopeHoliday' exact>
            <Menu>
              <MemoizedHopeHoliday />
            </Menu>
          </Route>
          <Route path='/requiredNumberOfPeople' exact>
            <Menu>
              <RequiredNumberOfPeople />
            </Menu>
          </Route>
          <Route path='/questions' exact>
            <Menu>
              <Questions />
            </Menu>
          </Route>
          <Route path='/modal' exact>
            <Menu>
              <Modal />
            </Menu>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

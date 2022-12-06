import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
//date-fns
import { format } from 'date-fns';
//月末と月初を取得するsub- add-
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
//material
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//API
import { fetchHopeHoliday } from 'services/hopeHolidayApi';
import { fetchStaff } from 'services/staffApi';
//components
import CreateCalendar from './calendar';
//デザイン
import styles from 'styles/DayOff.module.css';

import { useAppDispatch } from 'hooks';
const useStylesCal = makeStyles((theme: Theme) => ({
  paper: {
    margin: theme.spacing(5, 10),
    padding: theme.spacing(5, 5),
  },
  yearmonth: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  tableHead: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.light,
  },
}));

const HopeHoliday: React.FC = React.memo(() => {
  const [targetDate, setTargetDate] = useState(new Date());
  const dispatch = useAppDispatch();
  const classesCal = useStylesCal();
  const setHopeHoliday = useCallback(() => {
    dispatch(fetchHopeHoliday());
  }, [dispatch]);

  const addStaff = useCallback(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const RenderHopeHolidayCal = React.memo(() => {
    return (
      <CreateCalendar
        targetDate={targetDate}
        setHopeHoliday={setHopeHoliday}
        addStaff={addStaff}
      />
    );
  });

  return (
    <>
      <div className={styles.calendar}>
        <CssBaseline />
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Button
              variant='outlined'
              onClick={() => setTargetDate(subMonths(targetDate, 1))}
            >
              前の月
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              onClick={() => setTargetDate(new Date())}
            >
              今月
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              onClick={() => setTargetDate(addMonths(targetDate, 1))}
            >
              次の月
            </Button>
          </Grid>
        </Grid>
        <Typography
          variant='h4'
          align='center'
          className={classesCal.yearmonth}
        >
          {format(targetDate, 'y年M月')}
          <RenderHopeHolidayCal />
        </Typography>
      </div>
    </>
  );
});

export default HopeHoliday;

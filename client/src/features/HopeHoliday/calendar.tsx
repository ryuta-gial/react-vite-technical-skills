import React, { useCallback, useMemo, useEffect } from 'react';
//selectors
import { mySelector } from 'store';
import { staffListSelector } from 'selectors/staff';
import { hopeHolidayListSelector } from 'selectors/hopeHoliday';
//date-fns
import getDay from 'date-fns/getDay';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import { format } from 'date-fns';
//components
import CheckButtonComponent from 'components/checkButton';
import { useMultipleChecked } from './useCheckData';
type Props = {
  targetDate: Date;
  setHopeHoliday: () => void;
  addStaff: () => void;
};

type InputCheckBoxTypes = {
  day: Date;
  val: string;
};

const CreateCalendar: React.FC<Props> = React.memo((props) => {
  const staffList = mySelector(staffListSelector);
  const hopeHolidayList = mySelector(hopeHolidayListSelector);
  const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'];
  useEffect(() => {
    if (staffList.length === 0) {
      //リロードの際にスタッフリストと希望休の値を取得する
      props.addStaff();
    }
    if (hopeHolidayList.length === 0) {
      props.setHopeHoliday();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const weekOfDays = eachDayOfInterval({
    start: startOfMonth(props.targetDate),
    end: endOfMonth(props.targetDate),
  });

  // const { checked, toggleChecked } = useMultipleChecked<string>(
  //   hopeHolidayList.map((row) => row.staffHopeHoliday)
  // );

  // const setToggleChecked = useCallback(
  //   (tgt: string) => {
  //     toggleChecked(tgt);
  //   },
  //   [toggleChecked]
  // );

  const InputCheckBox: React.FC<InputCheckBoxTypes> = (props) => {
    const { checked, toggleChecked } = useMultipleChecked<string>(
      hopeHolidayList.map((row) => row.staffHopeHoliday)
    );

    const setChecked = useMemo<string[]>(() => checked, [checked]);
    const setToggleChecked = useCallback(
      (tgt: string) => {
        toggleChecked(tgt);
      },
      [toggleChecked]
    );
    return (
      <CheckButtonComponent
        key={props.day.getDay()}
        name='dayOff'
        value={props.val}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setToggleChecked(e.target.value)
        }
        checked={setChecked.includes(props.val)}
      />
    );
  };

  return (
    <>
      <table
        style={{
          borderWidth: '1px',
          borderColor: '#aaaaaa',
          borderStyle: 'solid',
          margin: 'auto',
        }}
      >
        <thead>
          <tr>
            <th></th>
            {weekOfDays.map((day) => {
              switch (dayOfWeekStr[getDay(day)]) {
                case '土':
                  return (
                    <th key={day.getDate()}>
                      <div key={day.getDate()} style={{ color: 'blue' }}>
                        {dayOfWeekStr[getDay(day)]}
                      </div>
                    </th>
                  );
                case '日':
                  return undefined;
                default:
                  return (
                    <th key={day.getDate()}>
                      <div key={day.getDate()} style={{ color: 'black' }}>
                        {dayOfWeekStr[getDay(day)]}
                      </div>
                    </th>
                  );
              }
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Day</td>
            {weekOfDays.map((week) => {
              let cellTdDay;

              if (dayOfWeekStr[getDay(week)] !== '日') {
                cellTdDay = <td key={week.getDate()}>{week.getDate()}</td>;
              }

              return cellTdDay;
            })}
          </tr>
          {staffList.map((val) => (
            <tr key={val.id}>
              <td>{val.name}</td>
              {weekOfDays.map((day) => {
                let cellTdCheckDay;
                let setHopeHolidaySaveVal =
                  val.id + '_' + format(day, 'yyyy-MM-dd');

                if (dayOfWeekStr[getDay(day)] !== '日') {
                  cellTdCheckDay = (
                    <td key={day.getDate()}>
                      <InputCheckBox day={day} val={setHopeHolidaySaveVal} />
                    </td>
                  );
                }
                return cellTdCheckDay;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
});

export default CreateCalendar;

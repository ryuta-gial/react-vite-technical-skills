import React, { useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { fetchStaff } from 'services/staffApi';
import { mySelector } from 'store';
import StaffList from './StaffList';
import styles from 'styles/Staff.module.css';
import { staffListSelector } from 'selectors/staff';
import { useAppDispatch } from 'hooks';

const Staff: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const staffList = mySelector(staffListSelector);
  const addStaff = useCallback(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  useEffect(() => {
    if (staffList.length === 0) {
      addStaff();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.inner}>
      {staffList.length <= 0 ? (
        '登録されたスタッフはいません。'
      ) : (
        <div className={styles.staffList}>
          {staffList.map((staffObj) => (
            <CSSTransition
              key={staffObj.id}
              timeout={{
                enter: 300,
                exit: 700,
              }}
              classNames='fade'
            >
              <StaffList staff={staffObj} />
            </CSSTransition>
          ))}
        </div>
      )}
    </div>
  );
});

export default Staff;

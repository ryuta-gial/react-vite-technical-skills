import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { staffType } from 'types/staffTypes';
import styles from 'styles/Staff.module.css';
import StaffInput from './StaffInput';
import { deleteStaff } from 'services/staffApi';
type Props = {
  staff: staffType;
};

type StaffInputMemoType = {
  id?: string;
  name?: string;
  employmentStatus?: string;
  shiftType?: string;
  editMode?: boolean;
  setEditMode?: (arg: boolean) => void;
};

const StaffList: React.FC<Props> = React.memo((props) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const changeEditMode = useCallback((arg: boolean) => {
    setEditMode(arg);
  }, []);

  const StaffInputMemo = React.memo<StaffInputMemoType>(
    ({ id, name, employmentStatus, shiftType, editMode, setEditMode }) => (
      <StaffInput
        id={id}
        name={name}
        employmentStatus={employmentStatus}
        shiftType={shiftType}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    )
  );

  return (
    <div>
      {!editMode ? (
        <div>
          <li>
            <label>
              <span>{props.staff.name}</span>
            </label>
            <button
              onClick={() => changeEditMode(true)}
              className={`${styles.btn} ${styles.isEdit}`}
            >
              編集
            </button>
            <button
              onClick={() => dispatch(deleteStaff(props.staff.id))}
              className={`${styles.btn} ${styles.isDelete}`}
            >
              削除
            </button>
          </li>
        </div>
      ) : (
        <StaffInputMemo
          id={props.staff.id}
          name={props.staff.name}
          employmentStatus={props.staff.employmentStatus}
          shiftType={props.staff.shiftType}
          editMode={editMode}
          setEditMode={changeEditMode}
        />
      )}
    </div>
  );
});

export default StaffList;

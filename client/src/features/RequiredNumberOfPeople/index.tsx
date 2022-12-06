import React, { useEffect, useCallback } from 'react';
import { fetchRequiredNumberOfPeople } from 'services/requiredNumberOfPeopleApi';
import { mySelector } from 'store';
import { requiredNumberOfPeopleListSelector } from 'selectors/requiredNumberOfPeople';
import { useAppDispatch } from 'hooks';
import { requiredNumberOfPeopleType } from 'types/requiredNumberOfPeopleTypes';
const RequiredNumberOfPeople: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const requiredNumberOfPeopleList = mySelector(
    requiredNumberOfPeopleListSelector
  );
  const addRequiredNumberOfPeople = useCallback(() => {
    dispatch(fetchRequiredNumberOfPeople());
  }, [dispatch]);

  useEffect(() => {
    if (requiredNumberOfPeopleList.length === 0) {
      addRequiredNumberOfPeople();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h2>RequiredNumberOfPeople</h2>
      <div>
        {requiredNumberOfPeopleList.map((val: requiredNumberOfPeopleType) => (
          <div key={val.id}>{val.workDate}</div>
        ))}
      </div>
    </>
  );
});

export default RequiredNumberOfPeople;

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createHopeHolidayType } from 'types/hopeHolidayTypes';
import { createHopeHoliday, deleteHopeHoliday } from 'services/hopeHolidayApi';

import { useAppDispatch } from 'hooks';
type useMultipleCheckedRet<T> = {
  checked: T[];
  toggleChecked: (tgt: T) => void;
  //allCheck: () => void;
  clearCheck: () => void;
};
/**
 * 複数チェックの管理用フック
 */
export function useMultipleChecked<T>(
  //canCheckItems: hopeHolidayType[],
  //canCheckItems:T[],
  initVal: T[]
): useMultipleCheckedRet<T> {
  const dispatch = useAppDispatch();
  // チェック済み管理用状態
  const [checked, setChecked] = useState<T[]>(initVal || []);

  // チェックボックスをクリックした時等のチェック済み、未チェックの入れ替え
  const makeHopeHolidayApiData = useCallback(
    (tgt: T, action: string) => {
      if (typeof tgt === 'string') {
        // 指定文字のインデックス
        let index = tgt.indexOf('_');
        //substring()で指定した文字までを切り出し。
        let staffId = tgt.substring(0, index);
        let hopeHoliday = tgt.substring(index + 1);
        const hopeHolidaySetData: createHopeHolidayType = {
          staffId: Number(staffId),
          hopeHoliday: hopeHoliday,
          staffHopeHoliday: tgt,
        };
        if (action === 'save') {
          dispatch(createHopeHoliday(hopeHolidaySetData));
        } else if (action === 'delete') {
          dispatch(deleteHopeHoliday(hopeHolidaySetData));
        }
      }
    },
    [dispatch]
  );
  const toggleChecked = useCallback(
    (tgt: T) => {
      if (checked.includes(tgt)) {
        setChecked([...checked.filter((item) => item !== tgt)]);
        makeHopeHolidayApiData(tgt, 'delete');
      } else {
        setChecked([...checked.concat([tgt])]);
        makeHopeHolidayApiData(tgt, 'save');
      }
    },
    [checked, makeHopeHolidayApiData]
  );
  // 全てチェック することないからコメントアウト
  //const allCheck = () => setChecked(canCheckItems);
  // 全てのチェックを解除
  const clearCheck = () => setChecked([]);
  // 必要な情報と関数のみ外へ
  return {
    checked,
    toggleChecked,
    // allCheck,
    clearCheck,
  };
}

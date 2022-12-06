import React from 'react';
import { setVehiclesStateTypes } from 'types/formTypes';

export type listPropsTypes = {
  list: setVehiclesStateTypes[];
};

function Options(props: listPropsTypes) {
  const list = props.list;
  const listItems = list.map((obj) => (
    <option key={obj.value} value={obj.value}>
      {obj.label}
    </option>
  ));
  return <>{listItems};</>;
}

export default Options;

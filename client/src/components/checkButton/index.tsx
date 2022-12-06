import React from 'react';
//material
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
//input要素の場合は下記のようにすれば、一括で型を渡せる(学習)
// type InputProps = JSX.IntrinsicElements['input']
// type Props = InputProps & { labelText: string }

const CheckButtonComponent: React.FC<CheckboxProps> = React.memo((props) => {
  // const { labelText, ...inputProps } = props
  return (
    <FormControl component='fieldset'>
      <FormGroup>
        <Checkbox {...props} />
      </FormGroup>
    </FormControl>
  );
});

export default CheckButtonComponent;

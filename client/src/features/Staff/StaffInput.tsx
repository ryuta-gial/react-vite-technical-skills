import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { mySelector } from 'store';
//Type
import {
  employmentStatusType,
  inputStaffType,
  shiftType,
} from 'types/staffTypes';
//Api
import {
  fetchStaffEmploymentStatus,
  fetchShiftType,
  createStaff,
  editStaff,
} from 'services/staffApi';
//material
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {
  staffShiftTypeSelector,
  staffEmploymentStatusSelector,
} from 'selectors/staff';
import { useAppDispatch } from 'hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 20,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    button: {
      margin: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);

type propsType = {
  id?: string;
  name?: string;
  employmentStatus?: string;
  shiftType?: string;
  editMode?: boolean;
  setEditMode?: (arg: boolean) => void;
};
const StaffInput: React.FC<propsType> = React.memo((props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const shiftType = mySelector(staffShiftTypeSelector);
  const employmentStatus = mySelector(staffEmploymentStatusSelector);
  const [state, setState] = useState<inputStaffType>({
    name: props.name ? props.name : '',
    employmentStatus: props.employmentStatus ? props.employmentStatus : '',
    shiftType: props.shiftType ? props.shiftType : '',
  });
  const setUseInputValue = useCallback(() => {
    dispatch(fetchStaffEmploymentStatus());
    dispatch(fetchShiftType());
  }, [dispatch]);

  useEffect(() => {
    if (employmentStatus.length === 0 && shiftType.length === 0) {
      setUseInputValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(createStaff(state));
  }, [dispatch, state]);

  const handleSubmitEdit = () => {
    const StaffId = props.id ? props.id : '';
    const arg = {
      inputState: state,
      staffId: StaffId,
    };
    dispatch(editStaff(arg));
  };

  const inputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
      setState({ ...state, [event.target.name]: event.target.value });
    },
    [state]
  );

  const handleCheckBoxChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (state.shiftType === null) return;
    let p = Array.from(state.shiftType.split(','));
    //初回答
    if (p.indexOf(e.target.value) === -1 && state.shiftType!.length === 0) {
      setState({ ...state, [e.target.name]: e.target.value });
    } else if (p.indexOf(e.target.value) === -1) {
      p.push(e.target.value);
      setState({ ...state, [e.target.name]: p.join(',') });
    } else {
      p = p.filter((v) => v !== e.target.value);
      setState({ ...state, [e.target.name]: p.join(',') });
    }
  };
  const isDisabledSubmitButton = () => {
    if (
      state.name === null ||
      state.employmentStatus === null ||
      state.shiftType === null
    )
      return;
    if (
      state.name.length > 0 &&
      state.employmentStatus.length > 0 &&
      state.shiftType.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  function renderRadio() {
    if (employmentStatus !== null) {
      const employment = employmentStatus.map((item: employmentStatusType) => {
        return (
          <FormControlLabel
            key={item.id}
            name='employmentStatus'
            value={item.name}
            control={<Radio />}
            label={item.name}
          />
        );
      });
      return employment;
    }
  }
  function renderCheckBox() {
    if (shiftType !== null) {
      const shift = shiftType.map((item: shiftType) => {
        return (
          <FormControlLabel
            key={item.id}
            name='shiftType'
            value={item.id}
            control={
              <Checkbox
                checked={state.shiftType?.includes(item.id)}
                onChange={(e) => handleCheckBoxChange(e)}
              />
            }
            label={item.name}
          />
        );
      });
      return shift;
    }
  }

  function renderInputForm() {
    return (
      <Container maxWidth='sm'>
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField
                id='standard-secondary'
                name='name'
                label='名前'
                value={state.name}
                color='secondary'
                onChange={(e) => inputChange(e)}
              />
            </form>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormGroup>
                <RadioGroup
                  aria-label='employmentStatus'
                  onChange={(e) => inputChange(e)}
                  value={state.employmentStatus}
                >
                  <FormLabel component='legend'>雇用形態</FormLabel>
                  {renderRadio()}
                </RadioGroup>
                <FormLabel component='legend'>可能シフト</FormLabel>
                {renderCheckBox()}
              </FormGroup>
            </FormControl>
            <div>
              <Button
                disabled={isDisabledSubmitButton()}
                variant='contained'
                color='primary'
                size='large'
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => {
                  if (props.setEditMode) {
                    props.setEditMode(false);
                    handleSubmitEdit();
                  } else {
                    handleSubmit();
                  }
                }}
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <div style={!props.editMode ? { padding: 15 } : {}}>
      {renderInputForm()}
    </div>
  );
});
export default StaffInput;

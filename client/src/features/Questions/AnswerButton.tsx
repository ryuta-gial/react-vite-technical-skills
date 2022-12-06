import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { dependencyAnswerJudgment } from 'slices/questionsSlice';
///aterial
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
//type
import { answersType } from 'types/questionsType';

type Props = {
  id: number;
  answer: answersType[];
};

const AnswerButton: React.FC<Props> = React.memo((props) => {
  const dispatch: AppDispatch = useDispatch();

  function renderAnswerRadio() {
    const radioButton = props.answer.map((item: answersType, index: number) => {
      const dependency = props.id + '-' + item.answer;
      return (
        <FormControlLabel
          key={index}
          label={item.answer}
          control={<Radio />}
          disabled={item.disabled}
          name={item.answer}
          onChange={() => {
            dispatch(dependencyAnswerJudgment(dependency));
          }}
          value={item.answer}
        />
      );
    });
    return radioButton;
  }

  return (
    <div>
      <FormControl component='label'>
        <FormGroup>
          <RadioGroup row name='row-radio-buttons-group'>
            {renderAnswerRadio()}
          </RadioGroup>
        </FormGroup>
      </FormControl>
    </div>
  );
});

export default AnswerButton;

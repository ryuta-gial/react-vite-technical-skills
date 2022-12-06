import React from 'react';
import styles from 'styles/Questions.module.css';
import Box from '@material-ui/core/Box';
//components
import AnswerButton from './AnswerButton';
//type
import { questionsType } from 'types/questionsType';

type Props = {
  data: questionsType;
};

const QuestionsList: React.FC<Props> = React.memo((props) => {
  return (
    <Box m={2} p={1} color='palette.primary' key={props.data.id}>
      <div
        className={styles.content}
        key={props.data.id}
        id='back-to-top-anchor'
      >
        <span>{props.data.text}</span>
        <AnswerButton id={props.data.id} answer={props.data.answers} />
      </div>
    </Box>
  );
});

export default QuestionsList;

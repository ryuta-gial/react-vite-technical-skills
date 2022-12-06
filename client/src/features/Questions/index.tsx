import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { fetchQuestions } from 'services/questionsApi';
import { mySelector } from 'store';
import { questionsListSelector } from 'selectors/questions';
///aterial
import { Container, CssBaseline } from '@material-ui/core';
import Box from '@material-ui/core/Box';
//components
import QuestionsList from './QuestionsList';
import LazyComponent from './FooterButton';
//type
import { questionsType } from 'types/questionsType';
import { useAppDispatch } from 'hooks';
const Questions: React.FC = React.memo(() => {
  const [stateGroupNumber, setQuestionsGroupNumber] = useState<number>(1);
  const dispatch = useAppDispatch();
  const questionsList = mySelector(questionsListSelector);
  const addQuestions = useCallback(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (questionsList.length === 0) {
      addQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {questionsList.length <= 0 ? (
        'Load'
      ) : (
        <>
          <Container component='main' maxWidth='md'>
            <CssBaseline />
            <Box m={2} p={1} color='palette.primary'></Box>
            {questionsList.map((question: questionsType, index: number) => {
              if (stateGroupNumber === question.group) {
                return <QuestionsList key={index} data={question} />;
              }
              // 👇️ TO DO　回答ページ作成時に修正する
              return null;
            })}

            <Box m={2} p={3} color='palette.primary'></Box>
          </Container>
          <Suspense fallback={<div></div>}>
            <LazyComponent
              stateGroupNumber={stateGroupNumber}
              setQuestionsGroupNumber={setQuestionsGroupNumber}
            />
          </Suspense>
        </>
      )}
    </>
  );
});

export default Questions;

import React from 'react';
///aterial
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
//components
import ButtonGroup from 'components/buttonGroup';

let result: string | null = null;
const timeout = (msec: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, msec);
  });

type Props = {
  stateGroupNumber: number;
  setQuestionsGroupNumber: React.Dispatch<React.SetStateAction<number>>;
};

const LazyComponent: React.FC<Props> = React.memo((props) => {
  const increment = () =>
    props.setQuestionsGroupNumber(props.stateGroupNumber + 1);
  const decrement = () =>
    props.setQuestionsGroupNumber(props.stateGroupNumber - 1);

  if (result !== null) {
    return (
      <>
        <footer>
          <Container component='main' maxWidth='md'>
            <CssBaseline />
            <Box m={2} p={1} color='palette.primary'>
              <ButtonGroup
                isBackPageButtonShown={true}
                backPageButtonHandler={() => {
                  decrement();
                }}
                isNextGroupButtonShown={true}
                nextGroupButtonHandler={() => {
                  increment();
                }}
              />
            </Box>
          </Container>
        </footer>
      </>
    );
  }
  throw new Promise(async (resolve) => {
    await timeout(1000);
    result = 'Done';
    resolve(result);
  });
});

export default LazyComponent;

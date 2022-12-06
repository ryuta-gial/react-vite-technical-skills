import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const nextButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

type ButtonGroupProps = {
  isBackPageButtonShown: boolean;
  isNextGroupButtonShown: boolean;
  backPageButtonHandler?: Function;
  nextGroupButtonHandler?: Function;
};
const ButtonGroup = (props: ButtonGroupProps) => {
  const classes = useStyles();
  const nextClasses = nextButtonStyles();

  function goBackPage() {
    if (props.backPageButtonHandler) {
      props.backPageButtonHandler();
    }
  }
  function goNextGruop() {
    if (props.nextGroupButtonHandler) {
      props.nextGroupButtonHandler();
    }
  }

  const createBackPageButton = () => {
    return (
      <Grid item xs={6}>
        <Button
          style={{
            width: '100%',
            maxHeight: '50px',
            minWidth: '50px',
            minHeight: '50px',
          }}
          className={classes.paper}
          variant='outlined'
          onClick={() => {
            goBackPage();
          }}
        >
          戻る
        </Button>
      </Grid>
    );
  };

  const createNextGroupButton = (arg: boolean) => {
    if (arg === false) {
      return (
        <Grid item xs={12}>
          <Button
            style={{
              width: '100%',
              maxHeight: '50px',
              minWidth: '50px',
              minHeight: '50px',
            }}
            className={nextClasses.root}
            variant='contained'
            color='primary'
            disabled={false}
            onClick={() => {
              goNextGruop();
            }}
          >
            次へ
          </Button>
        </Grid>
      );
    }
    return (
      <Grid item xs={6}>
        <Button
          style={{
            width: '100%',
            maxHeight: '50px',
            minWidth: '50px',
            minHeight: '50px',
          }}
          className={nextClasses.root}
          variant='contained'
          color='primary'
          disabled={false}
          onClick={() => {
            goNextGruop();
          }}
        >
          次のグループへ
        </Button>
      </Grid>
    );
  };

  return (
    <div>
      <Grid container spacing={3}>
        {props.isBackPageButtonShown && props.backPageButtonHandler
          ? createBackPageButton()
          : null}
        {props.isNextGroupButtonShown && props.nextGroupButtonHandler
          ? createNextGroupButton(props.isBackPageButtonShown)
          : null}
      </Grid>
      {/* ボタンの順番 */}
    </div>
  );
};

export default ButtonGroup;

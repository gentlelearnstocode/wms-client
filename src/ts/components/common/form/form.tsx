import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Paper,
} from '@mui/material';

import classes from '@styles/form.module.scss';

const Form = (props: any) => {
  return (
    <Paper className={classes.root}>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
    </Paper>
  );
};

export default Form;

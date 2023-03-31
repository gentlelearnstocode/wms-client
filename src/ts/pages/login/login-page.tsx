import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';

import { AuthInput } from '@components/common';
import classes from '@styles/login-page.module.scss';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmitLogin = handleSubmit((data: any) => {
    console.log('data', data);
  });

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Box className={classes.form}>
          <form onSubmit={onSubmitLogin}>
            <TextField
              label="Email Address"
              type="email"
              {...register('email')}
              required
            />
            <TextField
              label="Password"
              type="password"
              {...register('password')}
              name="password"
              required
            />
            <Button type="submit">Login</Button>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default LoginPage;

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
import { useNavigate } from 'react-router-dom';

import classes from '@styles/login-page.module.scss';
import { useAuthSignin } from '@api/auth-api';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { mutateAsync } = useAuthSignin();
  const navigate = useNavigate();

  const onSubmitLogin = handleSubmit(async (data: any) => {
    await mutateAsync(data, {
      onSuccess: (res) => {
        navigate('/inventory');
        return res;
      },
    });
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

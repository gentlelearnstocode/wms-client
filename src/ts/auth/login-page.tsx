import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import LoginForm from './components/login-form';
import { Text } from '@components/core';
import classes from './styles.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate('/inventory');
    enqueueSnackbar('Login success', { variant: 'success' });
  };

  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>Logo </div>
      <div className={classes.formContainer}>
        <Text textSize="superlarge">Log in to your account</Text>
        <Text>Welcome back! Please login with your credentials!</Text>
        <LoginForm onLoginSuccess={onSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;

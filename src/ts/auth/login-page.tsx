import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import LoginForm from './components/login-form';

const LoginPage = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate('/inventory');
    enqueueSnackbar('Login success', { variant: 'success' });
  };

  return <LoginForm onLoginSuccess={onSuccess} />;
};

export default LoginPage;

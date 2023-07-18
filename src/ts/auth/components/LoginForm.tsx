import { useForm } from 'react-hook-form';
import { useAuthSignin } from '../api/auth';
import { Button, FieldInput } from '@components/core';
import classes from './styles/login-form.module.scss';

export interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const { register, handleSubmit } = useForm();
  const { mutateAsync, isLoading } = useAuthSignin();

  const onSubmitLogin = handleSubmit(async (data: any) => {
    await mutateAsync(data, {
      onSuccess: () => onLoginSuccess(),
    });
  });

  return (
    <form className={classes.form} onSubmit={onSubmitLogin}>
      <FieldInput placeholder="Email Address" type="email" iconLeft="mail" {...register('email')} />
      <FieldInput
        placeholder="Password"
        type="password"
        iconLeft="lock"
        {...register('password')}
      />
      <Button iconLeft="login" type="submit" variant="contained" isRunningAsync={isLoading}>
        Login
      </Button>
    </form>
  );
};

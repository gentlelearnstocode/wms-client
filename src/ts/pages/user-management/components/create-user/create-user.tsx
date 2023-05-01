import React from 'react';
import { Container } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { FormInput, Text, Select, Button } from '@components/core';
import { USER_TYPE_OPTIONS } from '@constants/options';
import { useCreateUser } from '@api/user-api';
import classes from './styles.module.scss';

export interface ICreateUser {
  warehouses: any;
  closeModal: () => void;
  onCreateSuccess: (userData) => void;
  onCreateError: (error) => void;
}

const reMapWarehouse = (warehouses: any) => {
  return warehouses.map((warehouse: any, index: number) => {
    return {
      id: index,
      label: warehouse?.name,
      value: warehouse?._id,
    };
  });
};

const CreateUser = ({ warehouses, closeModal, onCreateError, onCreateSuccess, ...props }: ICreateUser) => {
  const { handleSubmit, reset, control } = useForm();
  const { data, mutateAsync, isError, isSuccess, isLoading, isPaused } = useCreateUser();

  const handleAddUser = handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: () => {
        console.log('created data', data);
        onCreateSuccess(data);
      },
      onError: (error) => onCreateError(error),
    });
    reset();
  });

  const onClearForm = () => reset();

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Text textSize="large">Add user</Text>
        <form className={classes.form}>
          <div className={classes.contentContainer}>
            <div>
              <Text className={classes.inputLabel} textSize="medium">
                Username
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormInput className={classes.input} placeholder="Enter username" {...field} type="email" />
                )}
              />
            </div>
            <div>
              <Text className={classes.inputLabel} textSize="medium">
                Role
              </Text>
              <Controller
                control={control}
                name="role"
                render={({ field: { onChange, name, value = '' }, fieldState }) => (
                  <Select
                    onChangeOption={onChange}
                    name={name}
                    value={value}
                    options={USER_TYPE_OPTIONS}
                    label="User role"
                  />
                )}
              />
            </div>
            <div>
              <Text className={classes.inputLabel} textSize="medium">
                Assign warehouse
              </Text>
              <Controller
                control={control}
                name="warehouse"
                render={({ field: { onChange, name, value = '' } }) => (
                  <Select
                    onChangeOption={onChange}
                    name={name}
                    value={value}
                    options={reMapWarehouse(warehouses)}
                    label="Warehouse"
                    icon="factory"
                  />
                )}
              />
            </div>
            <div>
              <Text className={classes.inputLabel} textSize="medium">
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormInput className={classes.input} type="password" placeholder="Enter user password" {...field} />
                )}
              />
            </div>
            <div className={classes.buttonContainer}>
              <Button theme="cancel" onClick={() => closeModal()}>
                Cancel
              </Button>
              <Button theme="warning" onClick={() => onClearForm()}>
                Clear
              </Button>
              <Button onClick={handleAddUser} theme="primary" type="submit">
                Add
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default CreateUser;

import React from 'react';
import { Container } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';

import { useCreateSupplier } from '../api/create-supplier';
import { Button, FieldInput, Text } from '@components/core';
import classes from './styles/create-supplier.module.scss';

export interface ICreateSupplier {
  closeModal: () => void;
  onCreateSuccess: (supplierData: any) => void;
  onCreateError: (error: any) => void;
}

export const CreateSupplier = ({
  closeModal,
  onCreateError,
  onCreateSuccess,
  ...props
}: ICreateSupplier) => {
  const { handleSubmit, reset, control } = useForm();
  const { data, mutateAsync } = useCreateSupplier();

  const handleAddSupplier = handleSubmit(async (data) => {
    const newSupplier = {} as any;
    newSupplier.name = data.name;
    newSupplier.taxCode = data.taxCode;
    newSupplier.contact = {
      phone: data.phone,
      email: data.email,
    };
    newSupplier.addressInfo = {
      address: data.address,
      location: {
        longitude: data.longitude,
        latitude: data.latitude,
      },
    };
    console.log('format supplier', newSupplier);
    if (!_.isEmpty(newSupplier)) {
      await mutateAsync(newSupplier, {
        onSuccess: (data) => onCreateSuccess(newSupplier),
        onError: (error) => onCreateError(error),
      });
    }
  });

  const handleCancelClick = () => {
    reset();
    closeModal();
  };

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Text textSize="large">Add user</Text>
        <form className={classes.form} onSubmit={handleAddSupplier}>
          <div className={classes.contentContainer}>
            <div>
              <Text className={classes.inputLabel} textSize="medium">
                Name
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <FieldInput
                    className={classes.input}
                    defaultValue=""
                    placeholder="Enter supplier name"
                    {...field}
                    type="text"
                    required
                  />
                )}
              />
            </div>
            <div>
              <Text className={classes.inputLabel} textSize="medium">
                Phone number
              </Text>
              <Controller
                control={control}
                name="phone"
                render={({ field, fieldState }) => (
                  <FieldInput
                    className={classes.input}
                    type="text"
                    placeholder="Enter supplier phone number"
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Text className={classes.inputLabel} textSize="medium">
                Email
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <FieldInput
                    className={classes.input}
                    type="email"
                    defaultValue=""
                    placeholder="Enter supplier email"
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Text className={classes.inputLabel} textSize="medium">
                Tax code
              </Text>
              <Controller
                control={control}
                name="taxCode"
                render={({ field, fieldState }) => (
                  <FieldInput
                    className={classes.input}
                    type="text"
                    defaultValue=""
                    placeholder="Enter supplier tax code"
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Text className={classes.inputLabel} textSize="medium">
                Address
              </Text>
              <Controller
                control={control}
                name="address"
                defaultValue=""
                render={({ field, fieldState }) => (
                  <FieldInput
                    className={classes.input}
                    type="text"
                    defaultValue=""
                    placeholder="Enter supplier address"
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Text className={classes.inputLabel} textSize="medium"></Text>
              <Controller
                control={control}
                name="longitude"
                render={({ field, fieldState }) => (
                  <FieldInput
                    className={classes.input}
                    type="text"
                    defaultValue=""
                    placeholder="Enter supplier longitude"
                    required
                    {...field}
                  />
                )}
              />
              <Text className={classes.inputLabel} textSize="medium"></Text>
              <Controller
                control={control}
                name="latitude"
                render={({ field, fieldState }) => (
                  <FieldInput
                    className={classes.input}
                    type="text"
                    defaultValue=""
                    placeholder="Enter supplier latitude"
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div className={classes.buttonContainer}>
              <Button theme="cancel" onClick={() => handleCancelClick()}>
                Cancel
              </Button>
              <Button theme="warning" onClick={() => {}}>
                Clear
              </Button>
              <Button theme="primary" type="submit">
                Add
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
};

import { ChangeEvent, useState } from 'react';

import { CreateModalProps } from '../../../types/common';
import { PopupModal } from '@components/common';
import { Button, FieldInput, Text } from '@components/core';
import classes from '../styles/create-todo.module.scss';
import { Container } from '@mui/material';

type CreateTodoProps = {
  addTodoItem: ((label: string) => void) | undefined;
} & CreateModalProps;

export const CreateTodo = (props: CreateTodoProps) => {
  const [todo, setTodo] = useState<string>('');
  const { isOpen, close, addTodoItem } = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  const cancel = () => {
    setTodo('');
    close();
  };

  const confirm = () => {
    if (addTodoItem) {
      addTodoItem(todo);
    }
    close();
  };

  return (
    <PopupModal open={isOpen}>
      <Container>
        <FieldInput onChange={onChange} type="string" value={todo} />
        <div className={classes.buttonContainer}>
          <Button theme="white" onClick={() => cancel()}>
            <Text>Discard</Text>
          </Button>
          <Button onClick={() => confirm()}>
            <Text theme="white">Done</Text>
          </Button>
        </div>
      </Container>
    </PopupModal>
  );
};

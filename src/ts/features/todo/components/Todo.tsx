import { Fragment, useContext } from 'react';
import { Container, Icon, IconButton } from '@mui/material';

import { MainToolbar, Tabs } from '@components/common';
import { Button, Card, Text } from '@components/core';
import { TodoListContext } from '@providers/TodoProvider';
import { CreateTodo } from './CreateTodo';
import { useDisclosure } from '@hooks/useDisclosure';
import { formatDate } from '../../../utils/date-time';
import { TODO_TABS } from '../../../../constants/tabs';
import classes from '../styles/todo.module.scss';

export const Todo = () => {
  const todoContext = useContext(TodoListContext);
  const { isOpen, open, close } = useDisclosure();

  const onRemove = (id: number) => {
    todoContext?.removeTodoItem(id);
  };

  const onComplete = (id: number) => {
    todoContext?.toggleStatus(id);
  };

  const renderTabs = () => {
    return TODO_TABS.map((tab) => ({
      ...tab,
      content: renderTodoContent(tab.label as 'pending' | 'complete'),
    }));
  };

  const renderTodoContent = (status: 'pending' | 'complete') => {
    return (
      <Container className={classes.container}>
        {todoContext?.todoList
          .filter((todo) => todo.status === status)
          .map((todo) => (
            <Card
              key={todo.id}
              description="To do"
              deleteButton={
                <IconButton onClick={() => onRemove(todo.id)}>
                  <Icon color="error">delete</Icon>
                </IconButton>
              }
              confirmButton={
                <IconButton onClick={() => onComplete(todo.id)}>
                  <Icon color="success">done</Icon>
                </IconButton>
              }
            >
              <div className={classes.itemWrapper}>
                <Icon>access_time</Icon>
                <Text>{formatDate(todo.createdAt)}</Text>
              </div>
              <div className={classes.itemWrapper}>
                <Icon>description</Icon>
                <Text>{todo.label}</Text>
              </div>
            </Card>
          ))}
      </Container>
    );
  };

  return (
    <Fragment>
      <MainToolbar description="Todo list">
        <Button onClick={() => open()}>Add</Button>
      </MainToolbar>
      <CreateTodo addTodoItem={todoContext?.addTodoItem} isOpen={isOpen} close={close} />
      <Tabs tabs={renderTabs()} />
    </Fragment>
  );
};

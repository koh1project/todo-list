import { TodoList } from 'components/todoList/todoList';
import React, { FC } from 'react';

import { Todo } from 'redux/todo/todo.actions';

export type Props = {
  todos: Todo[];
};

export const TodoContainer: FC<Props> = (props) => {
  const { todos } = props;

  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};

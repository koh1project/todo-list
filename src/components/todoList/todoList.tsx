import React, { FC } from 'react';

import { Todo } from 'redux/todo/todo.actions';
import { TodoListItem } from 'components/todoListItem/todoListItem';
type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoListItem todo={todo} />
      ))}
    </div>
  );
};

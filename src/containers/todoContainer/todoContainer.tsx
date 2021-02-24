import React from 'react';
import { FC } from 'react';

import { Todo } from 'redux/todo/todo.actions';

export type Props = {
  todos: Todo[];
};

export const TodoContainer: FC<Props> = (props) => {
  const { todos } = props;
  return (
    <div>
      {todos.map((todo) => (
        <div key={Math.random()}>{todo.description}</div>
      ))}
    </div>
  );
};

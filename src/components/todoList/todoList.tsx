import React, { VFC } from 'react';

import { Todo } from 'redux/todo/todo.actions';
import { TodoListItem } from 'components/todoListItem/todoListItem';
type Props = {
  todos: Todo[];
};

export const TodoList: VFC<Props> = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={Math.random()} />
      ))}
    </div>
  );
};

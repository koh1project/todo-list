import { TodoList } from 'components/todoList/todoList';
import React, { VFC } from 'react';

import { Todo } from 'redux/todo/todo.actions';

export type Props = {
  todos: Todo[];
};

export const TodoContainer: VFC<Props> = (props) => {
  const { todos } = props;

  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};

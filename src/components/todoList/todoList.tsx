import React, { VFC } from 'react';

import { Todo } from 'redux/todo/todo.actions';
import { TodoListItem } from 'components/todoListItem/todoListItem';
type TodoListProps = {
  todos: Todo[];
  userId: string;
};

export const TodoList: VFC<TodoListProps> = ({ todos, userId }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={Math.random()} userId={userId} />
      ))}
    </div>
  );
};

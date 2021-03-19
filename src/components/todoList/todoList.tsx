import React, { VFC } from 'react';

import { Todo } from 'redux/todo/todo.actions';
import { TodoListItem } from 'components/todoListItem/todoListItem';
type TodoListProps = {
  todos: Todo[];
  userId: string;
  label: string;
};

export const TodoList: VFC<TodoListProps> = ({ label, todos, userId }) => {
  return (
    <div>
      <h2>{label}</h2>
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={Math.random()} userId={userId} />
      ))}
    </div>
  );
};

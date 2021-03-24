import React, { VFC } from 'react';
import { useDispatch } from 'react-redux';

import { Todo, updateTodosStartAsync } from 'redux/todo/todo.actions';
import { TodoListItem } from 'components/todoListItem/todoListItem';

type TodoListProps = {
  todos: Todo[];
  userId: string;
  label: string;
};

export const TodoList: VFC<TodoListProps> = ({ label, todos, userId }) => {
  const dispatch = useDispatch();
  const handlerOnClick = (todo: Todo) => {
    const changedTodo = { ...todo, done: !todo.done };

    console.log(todos);

    dispatch(updateTodosStartAsync(todos, changedTodo, userId));
  };

  return (
    <div>
      <h2>{label}</h2>
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={Math.random()} userId={userId} onClickCheckBox={handlerOnClick} />
      ))}
    </div>
  );
};

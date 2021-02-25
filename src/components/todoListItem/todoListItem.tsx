import React, { FC } from 'react';

import { Todo } from 'redux/todo/todo.actions';
import { deleteTodo } from 'redux/todo/todo.actions';
import { useDispatch } from 'react-redux';

type Props = {
  todo: Todo;
};

export const TodoListItem: FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div key={Math.random()}>
      <input type="checkbox" onClick={() => dispatch(deleteTodo(todo))} />
      {todo.description}
    </div>
  );
};

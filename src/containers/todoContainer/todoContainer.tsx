import React from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Todo } from 'redux/todo/todo.actions';

import { deleteTodo } from 'redux/todo/todo.actions';

export type Props = {
  todos: Todo[];
};

export const TodoContainer: FC<Props> = (props) => {
  const { todos } = props;
  const dispatch = useDispatch();

  return (
    <div>
      {todos.map((todo) => (
        <div key={Math.random()}>
          <input
            type="checkbox"
            onClick={() => {
              console.log(`Clicked ID:${todo.id}`);
              dispatch(deleteTodo(todo));
            }}
          />
          {todo.description}
        </div>
      ))}
    </div>
  );
};

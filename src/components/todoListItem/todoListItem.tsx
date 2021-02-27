import React, { FC, useState } from 'react';

import { Todo } from 'redux/todo/todo.actions';
import { deleteTodo } from 'redux/todo/todo.actions';
import { useDispatch } from 'react-redux';
import { EditableTodoListItem } from 'components/editableTodoListItem/editableTodoListItem';

type Props = {
  todo: Todo;
};

export const TodoListItem: FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState<boolean>(false);

  const handlerClicked = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setClicked(!clicked);
  };

  // @FIX:
  const dueDate = typeof todo.dueDate === 'string' ? todo.dueDate : new Date();
  console.log(dueDate);

  const content = clicked ? (
    <EditableTodoListItem todo={todo} clicked={setClicked} />
  ) : (
    <div key={Math.random()}>
      <input type="checkbox" onClick={() => dispatch(deleteTodo(todo))} />
      <span onClick={(evt) => handlerClicked(evt)}>
        {todo.description} - {dueDate.toString()}
      </span>
    </div>
  );

  return content;
};

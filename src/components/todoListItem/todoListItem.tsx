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

  const content = clicked ? (
    <EditableTodoListItem todo={todo} />
  ) : (
    <div key={Math.random()}>
      <input type="checkbox" onClick={() => dispatch(deleteTodo(todo))} />
      <span onClick={(evt) => handlerClicked(evt)}>
        {todo.description} - {todo.dueDate}
      </span>
    </div>
  );

  return content;
};

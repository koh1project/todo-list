import React, { VFC, useState } from 'react';

import { Todo } from 'redux/todo/todo.actions';
import { deleteTodosStartAsync } from 'redux/todo/todo.actions';
import { useDispatch, useSelector } from 'react-redux';
import { EditableTodoListItem } from 'components/editableTodoListItem/editableTodoListItem';
import { formattedDateString } from 'utils';
import { RootState } from 'redux/root-reducer';
type Props = {
  todo: Todo;
};

export const TodoListItem: VFC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState<boolean>(false);

  // let userId = useSelector((state: RootState) => state.user.currentUser);
  const userId = 'xTbimz0MSPLPw5xnKEe5'; //@TODO: テストデータ
  const todos = useSelector((state: RootState) => state.todo.todos);

  const handlerClicked = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setClicked(!clicked);
  };

  // @FIX:
  // const dueDate = typeof todo.dueDate === 'string' ? todo.dueDate : new Date();

  const content = clicked ? (
    <EditableTodoListItem todo={todo} clicked={setClicked} />
  ) : (
    <div key={Math.random()}>
      <input type="checkbox" onClick={() => dispatch(deleteTodosStartAsync(todos, todo, userId))} />
      <span onClick={(evt) => handlerClicked(evt)}>
        {todo.description} - {formattedDateString(todo.dueDate)}
      </span>
    </div>
  );

  return content;
};

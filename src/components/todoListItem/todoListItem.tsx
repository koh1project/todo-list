import React, { VFC, useState } from 'react';

import { Todo } from 'redux/todo/todo.actions';
import { deleteTodosStartAsync } from 'redux/todo/todo.actions';
import { useDispatch, useSelector } from 'react-redux';
import { EditableTodoListItem } from 'components/editableTodoListItem/editableTodoListItem';
import { formattedDateString } from 'utils';
import { RootState } from 'redux/root-reducer';
type TodoListItemProps = {
  todo: Todo;
  userId: string;
};

export const TodoListItem: VFC<TodoListItemProps> = ({ todo, userId }) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState<boolean>(false);
  const todos = useSelector((state: RootState) => state.todo.todos);

  const handlerClicked = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setClicked(!clicked);
  };

  const content = clicked ? (
    <EditableTodoListItem clicked={setClicked} userId={userId} todo={todo} />
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

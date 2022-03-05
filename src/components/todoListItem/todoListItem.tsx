import React, { VFC, useState } from 'react';

import { Todo } from 'redux/todo/todo.actions';

import { EditableTodoListItem } from 'components/editableTodoListItem/editableTodoListItem';
import { formattedDateString } from 'utils';

import './todoListItem.scss';

type TodoListItemProps = {
  todo: Todo;
  userId: string;
  onClickCheckBox: Function;
  onClickItem?: Function;
};

export const TodoListItem: VFC<TodoListItemProps> = ({ todo, userId, onClickCheckBox }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handlerClicked = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setClicked(!clicked);
  };

  const content = clicked ? (
    <EditableTodoListItem clicked={setClicked} userId={userId} todo={todo} />
  ) : (
    <div key={Math.random()} className="todo-list__item">
      <input type="checkbox" onClick={() => onClickCheckBox(todo)} />
      <p onClick={(evt) => handlerClicked(evt)} className="todo-list__item--text">
        {todo.description} - {formattedDateString(todo.dueDate)}
      </p>
    </div>
  );

  return content;
};

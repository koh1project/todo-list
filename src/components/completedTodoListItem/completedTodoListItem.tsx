import { VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/root-reducer';

import { Todo } from 'redux/todo/todo.actions';
import { updateTodosStartAsync } from 'redux/todo/todo.actions';
import { formattedDateString } from 'utils';

type CompletedTodoListItemProps = {
  todo: Todo;
  userId: string;
  onClickCheckBox: Function;
  onClickItem?: Function;
};

export const CompletedTodoListItem: VFC<CompletedTodoListItemProps> = ({ todo, userId, onClickCheckBox }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const handlerOnClick = (todo: Todo) => {
    const changedTodo = { ...todo, done: !todo.done };
    dispatch(updateTodosStartAsync(todos, changedTodo, userId));
  };

  return (
    <div key={Math.random()}>
      <span>
        {todo.description} - {formattedDateString(todo.dueDate)}
      </span>
      <button onClick={() => onClickCheckBox(todo)}>Delete</button>
      <button onClick={() => handlerOnClick(todo)}>Return</button>
    </div>
  );
};

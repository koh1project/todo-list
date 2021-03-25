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
      <input type="checkbox" onClick={() => onClickCheckBox(todo)} />
      <span onClick={() => handlerOnClick(todo)}>
        {todo.description} - {formattedDateString(todo.dueDate)}
      </span>
    </div>
  );
};

import { VFC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { deleteTodosStartAsync } from 'redux/todo/todo.actions';
import { RootState } from 'redux/root-reducer';

import { Todo } from 'redux/todo/todo.actions';
import { CompletedTodoListItem } from 'components/completedTodoListItem/completedTodoListItem';

type CompletedListProps = {
  completedTodos: Todo[];
  userId: string;
};

export const CompletedList: VFC<CompletedListProps> = ({ completedTodos, userId }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);

  const handlerOnClick = (todo: Todo) => {
    dispatch(deleteTodosStartAsync(todos, todo, userId));
  };

  return (
    <div>
      <h2>Completed List</h2>
      {completedTodos.map((todo) => (
        <CompletedTodoListItem todo={todo} key={Math.random()} userId={userId} onClickCheckBox={handlerOnClick} />
      ))}
    </div>
  );
};

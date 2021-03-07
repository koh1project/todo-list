import { TodoList } from 'components/todoList/todoList';
import { useEffect, VFC } from 'react';
import { useDispatch } from 'react-redux';

import { Todo, fetchTodosStartAsync } from 'redux/todo/todo.actions';

export type Props = {
  todos: Todo[];
};

export const TodoContainer: VFC<Props> = (props) => {
  const { todos } = props;

  const userId = 'xTbimz0MSPLPw5xnKEe5';

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodosStartAsync(userId));
    return () => {};
  }, []);

  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};

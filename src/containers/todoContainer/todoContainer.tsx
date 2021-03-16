import { TodoList } from 'components/todoList/todoList';
import { useEffect, VFC } from 'react';
import { useDispatch } from 'react-redux';

import { Todo, fetchTodosStartAsync } from 'redux/todo/todo.actions';

export type TodoContainerProps = {
  todos: Todo[];
  userId: string;
};

export const TodoContainer: VFC<TodoContainerProps> = ({ todos, userId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    userId !== '' && dispatch(fetchTodosStartAsync(userId));
    return () => {};
  }, [dispatch, userId]);

  return (
    <div>
      <TodoList todos={todos} userId={userId} />
    </div>
  );
};

import { TodoList } from 'components/todoList/todoList';
import { useEffect, useState, VFC } from 'react';
import { useDispatch } from 'react-redux';

import { Todo, fetchTodosStartAsync } from 'redux/todo/todo.actions';

export type TodoContainerProps = {
  todos: Todo[];
  userId: string;
};

export const TodoContainer: VFC<TodoContainerProps> = (props) => {
  const dispatch = useDispatch();
  const { userId } = props;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState<Todo[]>([]);

  useEffect(() => {
    userId !== '' && dispatch(fetchTodosStartAsync(userId));
    return () => {};
  }, [dispatch, userId]);

  useEffect(() => {
    setTodos(props.todos.filter((todo) => !todo.done));
    setCompleted(props.todos.filter((todo) => todo.done));
  }, [props.todos]);

  return (
    <div>
      <TodoList label={'Todo List'} todos={todos} userId={userId} />
      <TodoList label={'Completed List'} todos={completed} userId={userId} />
    </div>
  );
};

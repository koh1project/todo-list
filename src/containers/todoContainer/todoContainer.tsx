import { useEffect, useState, VFC } from 'react';
import { useDispatch } from 'react-redux';

import { Todo, fetchTodosStartAsync } from 'redux/todo/todo.actions';

import { TodoList } from 'components/todoList/todoList';
import { CompletedList } from 'components/completedList/completedList';

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
      <CompletedList completedTodos={completed} userId={userId} />
    </div>
  );
};

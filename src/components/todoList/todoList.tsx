import { VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/root-reducer';

import { Todo, updateTodosStartAsync } from 'redux/todo/todo.actions';
import { TodoListItem } from 'components/todoListItem/todoListItem';

type TodoListProps = {
  userId: string;
  label: string;
  todos: Todo[];
};

export const TodoList: VFC<TodoListProps> = ({ label, userId, todos }) => {
  const dispatch = useDispatch();
  const storedTodos = useSelector((state: RootState) => state.todo.todos);

  const handlerOnClick = (todo: Todo) => {
    const changedTodo = { ...todo, done: !todo.done };
    dispatch(updateTodosStartAsync(storedTodos, changedTodo, userId));
  };

  return (
    <div>
      <h2>{label}</h2>
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={Math.random()} userId={userId} onClickCheckBox={handlerOnClick} />
      ))}
    </div>
  );
};

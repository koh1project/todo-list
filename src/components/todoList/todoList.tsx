import { VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/root-reducer';

import { Todo, updateTodosStartAsync } from 'redux/todo/todo.actions';
import { TodoListItem } from 'components/todoListItem/todoListItem';

import './todoList.scss';

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
    <div className="todo-list-container ">
      <h2>{label}</h2>
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoListItem todo={todo} key={Math.random()} userId={userId} onClickCheckBox={handlerOnClick} />
        ))}
      </div>
    </div>
  );
};

import { VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/root-reducer';

import { Todo } from 'redux/todo/todo.actions';
import { updateTodosStartAsync } from 'redux/todo/todo.actions';
import { formattedDateString } from 'utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

const trashLookup: IconLookup = { prefix: 'fas', iconName: 'trash' };
const trashIconDefinition: IconDefinition = findIconDefinition(trashLookup);
const returnLookup: IconLookup = { prefix: 'fas', iconName: 'arrow-rotate-left' };
const returnIconDefinition: IconDefinition = findIconDefinition(returnLookup);

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
      <button onClick={() => onClickCheckBox(todo)}>
        <FontAwesomeIcon icon={trashIconDefinition} />
      </button>
      <button onClick={() => handlerOnClick(todo)}>
        {/* <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" /> */}
        <FontAwesomeIcon icon={returnIconDefinition} />
      </button>
    </div>
  );
};

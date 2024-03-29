import React, { VFC, useState } from 'react';
import { Todo } from 'redux/todo/todo.actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/root-reducer';
import { updateTodosStartAsync } from 'redux/todo/todo.actions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import FormInput from '../form-input/form-input';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './editableTodoListItem.scss';

library.add(fas);

const editLookup: IconLookup = { prefix: 'fas', iconName: 'edit' };
const penIconDefinition: IconDefinition = findIconDefinition(editLookup);

type EditableTodoListItemProps = {
  todo: Todo;
  clicked: Function;
  userId: string;
};

const EventTargets = {
  dueDate: 'dueDate',
  description: 'description',
} as const;

export const EditableTodoListItem: VFC<EditableTodoListItemProps> = ({ todo, clicked, userId }) => {
  console.log('clicked: ', clicked);
  const dispatch = useDispatch();

  const [description, setDescription] = useState<string>(todo.description);
  const [dueDate, setDueDate] = useState<Date>(new Date(todo.dueDate as Date));
  const todos = useSelector((state: RootState) => state.todo.todos);

  const handleSubmit = () => {
    clicked(false);

    const newTodo = {
      ...todo,
      description: description,
      dueDate: dueDate,
    };
    dispatch(updateTodosStartAsync(todos, newTodo, userId));
  };
  const handleChangeDescription = (event: any) => {
    event.preventDefault();

    setDescription(event.target.value);
  };

  return (
    <div key={todo.id} className={'edit-item'}>
      <div className={'EditableTodoListItem'}>
        <FormInput
          type="text"
          name={EventTargets.description}
          handleChange={handleChangeDescription}
          value={description}
          className={'edit-item__todo-text'}
        />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date as Date)} />
        <button onClick={() => handleSubmit()}>
          <FontAwesomeIcon icon={penIconDefinition} />
          {/* <SubmitButton label={'Edit'} handleSubmit={handleSubmit} className="edit-btn" /> */}
        </button>
      </div>
    </div>
  );
};

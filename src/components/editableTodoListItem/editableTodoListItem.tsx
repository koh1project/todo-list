import React, { VFC, useState } from 'react';
import { Todo } from 'redux/todo/todo.actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/root-reducer';
import { updateTodosStartAsync } from 'redux/todo/todo.actions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import FormInput from '../form-input/form-input';
import { SubmitButton } from 'components/Button/SubmitButton';

import './editableTodoListItem.css';

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
  const dispatch = useDispatch();

  const [description, setDescription] = useState<string>(todo.description);
  const [dueDate, setDueDate] = useState<Date>(new Date(todo.dueDate as Date));
  const todos = useSelector((state: RootState) => state.todo.todos);

  const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
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
    <div key={todo.id}>
      <form className={'EditableTodoListItem'}>
        <FormInput
          type="text"
          name={EventTargets.description}
          handleChange={handleChangeDescription}
          value={description}
        />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date as Date)} />
        <SubmitButton label={'編集'} handleSubmit={handleSubmit} />
      </form>
    </div>
  );
};

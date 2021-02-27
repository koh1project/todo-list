import React, { FC, useState } from 'react';
import { Todo } from 'redux/todo/todo.actions';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import FormInput from '../form-input/form-input';

type Props = {
  todo: Todo;
  clicked: Function;
};

const EventTargets = {
  dueDate: 'dueDate',
  description: 'description'
} as const;

export const EditableTodoListItem: FC<Props> = ({ todo, clicked }) => {
  const [description, setDescription] = useState<string>(todo.description);
  const [dueDate, setDueDate] = useState<Date>(new Date(todo.dueDate as Date));

  const handlerSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    clicked(false);
  };
  const handleChangeDescription = (event: any) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  return (
    <div key={todo.id}>
      <form>
        <FormInput
          type="text"
          name={EventTargets.description}
          handleChange={handleChangeDescription}
          value={description}
        />

        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date as Date)} />
        <input type="submit" value="編集" onClick={(event) => handlerSubmit(event)} />
      </form>
    </div>
  );
};

import React, { FC, useState } from 'react';
import { Todo } from 'redux/todo/todo.actions';

import firebase from 'firebase';

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
  const [dueDate, setDueDate] = useState<Date>(todo.dueDate as Date);

  const handlerChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(event.target);

    switch (name) {
      case EventTargets.dueDate:
        setDueDate(value);
        break;
      case EventTargets.description:
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handlerSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    clicked(false);
  };

  return (
    <div key={Math.random()}>
      <form>
        <input
          type="text"
          name={EventTargets.description}
          placeholder={todo.description}
          onChange={(event) => handlerChange(event)}
          value={todo.description}
        />
        <input
          type="date"
          name={EventTargets.dueDate}
          value={todo.dueDate.toString()}
          onChange={(event) => handlerChange(event)}
        />
        <input type="submit" value="編集" onClick={(event) => handlerSubmit(event)} />
      </form>
    </div>
  );
};

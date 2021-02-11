import React, { FC } from 'react';

interface Props {
  handleChange: Function;
  label: string;
}

const FormInput: FC<Props> = ({ handleChange, label, ...props }) => {
  return (
    <div>
      <input
        name="email"
        type="text"
        {...props}
        onChange={(evt) => {
          handleChange(evt);
        }}
      ></input>
    </div>
  );
};

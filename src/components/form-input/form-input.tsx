import { FormatInputPathObject } from 'path';
import React, { FC } from 'react';

interface Props {
  handleChange: (evt: React.ChangeEvent) => void;
  label: string;
  name: string;
  type: string;
  value: string;
}

const FormInput: FC<Props> = ({ handleChange, label, ...props }) => {
  return (
    <div>
      <input {...props} onChange={(evt) => handleChange(evt)}></input>
      {label ? <label>{label}</label> : null}
    </div>
  );
};
export default FormInput;

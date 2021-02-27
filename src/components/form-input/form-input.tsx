import React, { FC } from 'react';

export interface FormInputProps {
  name: string;
  type: string;
  value: string;
  label?: string;
  handleChange: (evt: React.ChangeEvent) => void;
}

const FormInput: FC<FormInputProps> = ({ handleChange, label, ...props }) => {
  return (
    <>
      <input {...props} onChange={(evt) => handleChange(evt)}></input>
      {label ? <label>{label}</label> : null}
    </>
  );
};

export default FormInput;

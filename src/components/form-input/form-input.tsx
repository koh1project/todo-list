import { VFC } from 'react';

export interface FormInputProps {
  name: string;
  type: string;
  value: string;
  label?: string;
  // handleChange: (evt: React.ChangeEvent) => void;
  handleChange: Function;
  className?: string;
}

const FormInput: VFC<FormInputProps> = ({ handleChange, label, className, ...props }) => {
  return (
    <div className={className}>
      {label ? <label>{label}</label> : null}
      <input {...props} onChange={(evt) => handleChange(evt)} placeholder={props.name}></input>
    </div>
  );
};

export default FormInput;

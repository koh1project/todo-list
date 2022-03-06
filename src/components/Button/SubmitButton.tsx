import React, { VFC } from 'react';
export type SubmitButtonProps = {
  handleSubmit: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  label: string;
  className: string;
};
export const SubmitButton: VFC<SubmitButtonProps> = (props) => (
  <input className={props.className} type="submit" value={props.label} onClick={(event) => props.handleSubmit(event)} />
);

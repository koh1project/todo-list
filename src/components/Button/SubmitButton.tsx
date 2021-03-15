import React, { VFC } from 'react';
export type SubmitButtonProps = {
  handleSubmit: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  label: string;
};
export const SubmitButton: VFC<SubmitButtonProps> = (props) => (
  <input type="submit" value={props.label} onClick={(event) => props.handleSubmit(event)} />
);

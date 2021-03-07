import React, { VFC } from 'react';
export type SubmitButtonProps = {
  handleSubmit: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};
export const SubmitButton: VFC<SubmitButtonProps> = (props) => (
  <input type="submit" value="編集" onClick={(event) => props.handleSubmit(event)} />
);

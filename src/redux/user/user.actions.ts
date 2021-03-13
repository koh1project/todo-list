import { ValueOf } from './../redux.utils';
import { UserActionTypes } from './user.types';

export type UserAction = {
  type: ValueOf<typeof UserActionTypes>;
  payload: string;
};

export const setCurrentUser = (user: string): UserAction => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

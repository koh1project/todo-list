import { UserActionTypes } from './user.types';

type ValueOf<T> = T[keyof T];

export type UserAction = {
  type: ValueOf<typeof UserActionTypes>;
  payload: string;
};

export const setCurrentUser = (user: string): UserAction => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

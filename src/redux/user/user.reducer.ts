import { Reducer } from 'redux';
import { UserActionTypes } from './user.types';
import { UserAction } from './user.actions';

export type UserState = { currentUser: string | null };
export const INITIAL_STATE: UserState = { currentUser: null };

export const userReducer: Reducer<UserState, UserAction> = (
  state: UserState = INITIAL_STATE,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload!,
      };
    case UserActionTypes.DELETE_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

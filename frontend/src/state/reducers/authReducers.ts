import { ActionType } from "../actionInterfaces/actionTypes";
import { Action } from "../actionInterfaces/index";

export interface UserState {
  email: string | null;
  isAdmin: Boolean;
}

const initialState: UserState = {
  email: null,
  isAdmin: false,
};

export const userReducer = (state: UserState = initialState, action: Action): UserState => {
  switch (action.type) {
    case ActionType.LOGIN_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

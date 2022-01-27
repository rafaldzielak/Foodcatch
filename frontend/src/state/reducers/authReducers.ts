import { ActionType } from "../actionInterfaces/actionTypes";
import { Action } from "../actionInterfaces/index";

export interface UserState {
  email: string | null;
  isAdmin: Boolean;
  jwt: String;
}

const initialState: UserState = {
  email: null,
  isAdmin: false,
  jwt: "",
};

export const userReducer = (state: UserState = initialState, action: Action): UserState => {
  switch (action.type) {
    case ActionType.LOGIN_USER:
      return { ...state, ...action.payload };
    case ActionType.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

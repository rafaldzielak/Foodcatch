import { Action } from "../actionInterfaces/index";
import { Dispatch } from "redux";
import { ActionType } from "../actionInterfaces/actionTypes";
import { User } from "../../models/user";

export const loginUserAction = (user: User) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.LOGIN_USER, payload: user });
};

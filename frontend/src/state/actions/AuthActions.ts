import { Action } from "../actionInterfaces/index";
import { Dispatch } from "redux";
import { ActionType } from "../actionInterfaces/actionTypes";
import { User } from "../../models/user";
import { apolloClient } from "../../utils/apolloClient";
import { getUserQuery } from "../../queries/authQueries";

export const loginUserAction = (user: User) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.LOGIN_USER, payload: user });
  localStorage.setItem("jwt", user.jwt);
};

export const fetchUserFromDbAction = () => async (dispatch: Dispatch<Action>) => {
  if (localStorage.getItem("jwt")) {
    const res = await apolloClient.query<{ getUser: User }>({ query: getUserQuery });
    if (res?.data?.getUser?.email) dispatch({ type: ActionType.LOGIN_USER, payload: res.data.getUser });
  }
};

export const logoutUserAction = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.LOGOUT_USER });
  localStorage.removeItem("jwt");
};

import { Action, Dish } from "../actionInterfaces/index";
import { Dispatch } from "redux";
import { ActionType } from "../actionInterfaces/actionTypes";

export const getDishesAction = (dishes: Dish[]) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.GET_DISHES, payload: dishes });
};

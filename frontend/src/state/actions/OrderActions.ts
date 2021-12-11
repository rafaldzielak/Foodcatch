import { Dispatch } from "redux";
import { ActionType } from "../actionInterfaces/actionTypes";
import { Order } from "../../models/order";
import { Action } from "../actionInterfaces/index";
import { setLSCartItems } from "./common";

export const placeOrderAction = (orderData: Order) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.SET_ORDER, payload: orderData });
  setLSCartItems([]);
};

export const setOrderAction = (orderData: Order) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.SET_ORDER, payload: orderData });
};

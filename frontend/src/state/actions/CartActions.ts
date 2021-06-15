import { Action } from "../actionInterfaces/index";
import { Dispatch } from "redux";
import { ActionType } from "../actionInterfaces/actionTypes";
import { dishesMock } from "../../mocks/dishesMock";

export const addToCartAction = (id: number) => (dispatch: Dispatch<Action>, getState: any) => {
  const { cart } = getState();
  const foundDish = dishesMock.find((dish) => dish.id === id);
  if (foundDish) dispatch({ type: ActionType.ADD_TO_CART, payload: { ...foundDish, quantity: 1 } });
  localStorage.setItem("cart", JSON.stringify(cart.items));
};

export const removeFromCartAction = (id: number) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.REMOVE_FROM_CART, payload: id });
};

import { Action, Dish } from "../actionInterfaces/index";
import { Dispatch } from "redux";
import { ActionType } from "../actionInterfaces/actionTypes";
import { setLSCartItems } from "./common";

export const addToCartAction = (id: string) => (dispatch: Dispatch<Action>, getState: any) => {
  const { cart, dishes: dishesState } = getState();
  const foundDish = dishesState.dishes.find((dish: Dish) => dish.id === id);
  if (foundDish) dispatch({ type: ActionType.ADD_TO_CART, payload: { ...foundDish, quantity: 1 } });
  setLSCartItems(cart?.dishes);
};

export const removeFromCartAction = (id: string) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.REMOVE_FROM_CART, payload: id });
};

export const updateCartAction =
  (id: string, quantity: number) => (dispatch: Dispatch<Action>, getState: any) => {
    const { cart } = getState();
    if (quantity === 0) dispatch({ type: ActionType.REMOVE_FROM_CART, payload: id });
    else dispatch({ type: ActionType.UPDATE_CART_ITEM, payload: { id, quantity } });
    setLSCartItems(cart?.dishes);
  };

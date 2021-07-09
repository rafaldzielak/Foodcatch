import { Action } from "../actionInterfaces/index";
import { Dispatch } from "redux";
import { ActionType } from "../actionInterfaces/actionTypes";
import { dishesMock } from "../../mocks/dishesMock";

const setLSCartItems = (items: []) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

export const addToCartAction = (id: number) => (dispatch: Dispatch<Action>, getState: any) => {
  const { cart } = getState();
  const foundDish = dishesMock.find((dish) => dish.id === id);
  if (foundDish) dispatch({ type: ActionType.ADD_TO_CART, payload: { ...foundDish, quantity: 1 } });
  setLSCartItems(cart.items);
};

export const removeFromCartAction = (id: number) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.REMOVE_FROM_CART, payload: id });
};

export const updateCartAction =
  (id: number, quantity: number) => (dispatch: Dispatch<Action>, getState: any) => {
    const { cart } = getState();
    if (quantity === 0) dispatch({ type: ActionType.REMOVE_FROM_CART, payload: id });
    else dispatch({ type: ActionType.UPDATE_CART_ITEM, payload: { id, quantity } });
    setLSCartItems(cart.items);
  };

export const placeOrderAction = () => (dispatch: Dispatch<Action>, getState: any) => {
  dispatch({ type: ActionType.PLACE_ORDER });
  setLSCartItems([]);
};

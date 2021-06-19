import { ActionType } from "./actionTypes";

export interface Dish {
  id: number;
  quantity: number;
  price: number;
  title: string;
  description: string;
  isVege: boolean;
  isSpicy: boolean;
  imgURL: string;
}

interface AddToCartAction {
  type: ActionType.ADD_TO_CART;
  payload: Dish;
}

interface RemoveFromCartAction {
  type: ActionType.REMOVE_FROM_CART;
  payload: number;
}

interface UpdateCartItemAction {
  type: ActionType.UPDATE_CART_ITEM;
  payload: { id: number; quantity: number };
}

export type Action = AddToCartAction | RemoveFromCartAction | UpdateCartItemAction;
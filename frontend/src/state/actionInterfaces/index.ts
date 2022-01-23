import { Order } from "../../models/order";
import { User } from "../../models/user";
import { ActionType } from "./actionTypes";

export interface Dish {
  id: string;
  quantity: number;
  price: number;
  name: string;
  description: string;
  isVege: boolean;
  isSpicy: boolean;
  imgURL: string;
  type?: string;
}

interface AddToCartAction {
  type: ActionType.ADD_TO_CART;
  payload: Dish;
}

interface RemoveFromCartAction {
  type: ActionType.REMOVE_FROM_CART;
  payload: string;
}

interface UpdateCartItemAction {
  type: ActionType.UPDATE_CART_ITEM;
  payload: { id: string; quantity: number };
}

interface SetOrderAction {
  type: ActionType.SET_ORDER;
  payload: Order;
}

interface GetDishesAction {
  type: ActionType.GET_DISHES;
  payload: Dish[];
}

interface LoginUserAction {
  type: ActionType.LOGIN_USER;
  payload: User;
}

export type Action =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateCartItemAction
  | SetOrderAction
  | GetDishesAction
  | LoginUserAction;

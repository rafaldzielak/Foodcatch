import { ActionType } from "../actionInterfaces/actionTypes";
import { Action, Dish } from "../actionInterfaces/index";

export interface OrderState {
  items: Dish[];
}

const initialState: OrderState = {
  items: [],
};

export const orderReducer = (state: OrderState = initialState, action: Action): OrderState => {
  switch (action.type) {
    case ActionType.PLACE_ORDER:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

import { ActionType } from "../actionInterfaces/actionTypes";
import { Action, Dish } from "../actionInterfaces/index";

export interface CartState {
  error: string | null;
  items: Dish[];
}

const initialState: CartState = {
  error: null,
  items: [],
};

export const cartReducer = (state: CartState = initialState, action: Action): CartState => {
  switch (action.type) {
    case ActionType.ADD_TO_CART:
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.items.push(action.payload);
      return { ...state, items: state.items };
    case ActionType.REMOVE_FROM_CART:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };

    case ActionType.UPDATE_CART_ITEM:
      const itemToUpdate = state.items.find((item) => item.id === action.payload.id);
      if (itemToUpdate) itemToUpdate.quantity = action.payload.quantity;
      // return { ...state, items: state.items.map((item) => item.id === item) };
      return { ...state };
    case ActionType.PLACE_ORDER:
      return { ...state, items: [] };
    default:
      return state;
  }
};

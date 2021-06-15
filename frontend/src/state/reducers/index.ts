import { ActionType } from "../actionInterfaces/actionTypes";
import { Action, Dish } from "../actionInterfaces/index";

interface CartState {
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
      return { ...state, items: [...state.items, action.payload] };
    case ActionType.REMOVE_FROM_CART:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    default:
      return state;
  }
};

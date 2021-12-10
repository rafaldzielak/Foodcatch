import { ActionType } from "../actionInterfaces/actionTypes";
import { Action, Dish } from "../actionInterfaces/index";

export interface CartState {
  error: string | null;
  dishes: Dish[];
}

const initialState: CartState = {
  error: null,
  dishes: [],
};

export const cartReducer = (state: CartState = initialState, action: Action): CartState => {
  switch (action.type) {
    case ActionType.ADD_TO_CART:
      const item = state.dishes.find((item) => item.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.dishes.push(action.payload);
      return { ...state, dishes: state.dishes };
    case ActionType.REMOVE_FROM_CART:
      return { ...state, dishes: state.dishes.filter((item) => item.id !== action.payload) };

    case ActionType.UPDATE_CART_ITEM:
      const itemToUpdate = state.dishes.find((item) => item.id === action.payload.id);
      if (itemToUpdate) itemToUpdate.quantity = action.payload.quantity;
      return { ...state };
    case ActionType.SET_ORDER:
      return { ...state, dishes: [] };
    default:
      return state;
  }
};

import { ActionType } from "../actionInterfaces/actionTypes";
import { Action, Dish } from "../actionInterfaces/index";

export interface DishState {
  error: string | null;
  dishes: Dish[];
}

const initialState: DishState = {
  error: null,
  dishes: [],
};

export const dishesReducer = (state: DishState = initialState, action: Action): DishState => {
  switch (action.type) {
    case ActionType.GET_DISHES:
      return { ...state, dishes: action.payload };
    default:
      return state;
  }
};

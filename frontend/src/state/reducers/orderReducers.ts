import { Order } from "../../models/order";
import { ActionType } from "../actionInterfaces/actionTypes";
import { Action } from "../actionInterfaces/index";

const initialState: Order = {
  city: "",
  date: new Date(),
  dishes: [
    { description: "", id: "", imgURL: "", isSpicy: false, isVege: false, name: "", price: 0, quantity: 0 },
  ],
  firstName: "",
  id: "",
  paymentMethod: "card",
  phone: "",
  street: "",
  streetNumber: "",
  surname: "",
};

export const orderReducer = (state: Order = initialState, action: Action): Order => {
  switch (action.type) {
    case ActionType.SET_ORDER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

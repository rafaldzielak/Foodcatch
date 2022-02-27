import { Order } from "../../models/order";
import { ActionType } from "../actionInterfaces/actionTypes";
import { Action } from "../actionInterfaces/index";

const initialState: Order = {
  city: "",
  date: new Date(),
  dishes: [
    { description: "", id: "", imgURL: "", isSpicy: false, isVege: false, name: "", price: 0, quantity: 0 },
  ],
  email: "",
  firstName: "",
  id: "",
  paymentMethod: "card",
  paymentUrl: "",
  phone: "",
  street: "",
  streetNumber: "",
  surname: "",
  couponAppliedPercentage: 0,
  isDelivered: false,
  isPaid: false,
  orderPaymentId: "",
  orderPaymentProvider: "paypal",
};

export const orderReducer = (state: Order = initialState, action: Action): Order => {
  switch (action.type) {
    case ActionType.SET_ORDER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

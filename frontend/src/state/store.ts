import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/authReducers";
import { cartReducer } from "./reducers/cartReducers";
import { dishesReducer } from "./reducers/dishesReducers";
import { orderReducer } from "./reducers/orderReducers";

const middleware = [thunk];
const cartFromLS = localStorage.getItem("cart");
console.log(JSON.parse(cartFromLS!));
const parsedCart = cartFromLS && cartFromLS !== "undefined" ? JSON.parse(cartFromLS) : [];
const initialState = { cart: { dishes: parsedCart, error: null } };
const reducers = combineReducers({
  cart: cartReducer,
  order: orderReducer,
  dishes: dishesReducer,
  user: userReducer,
});
export const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export type RootState = ReturnType<typeof reducers>;

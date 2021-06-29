import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers";

const middleware = [thunk];
const cartFromLS = localStorage.getItem("cart");
const parsedCart = cartFromLS ? JSON.parse(cartFromLS) : [];
const initialState = { cart: { items: parsedCart, error: null } };
const reducers = combineReducers({ cart: cartReducer });
export const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export type RootState = ReturnType<typeof reducers>;

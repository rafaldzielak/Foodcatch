import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers";

const middleware = [thunk];
const initialState = {};
const reducers = combineReducers({ cart: cartReducer });
export const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

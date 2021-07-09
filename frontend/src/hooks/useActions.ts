import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addToCartAction,
  removeFromCartAction,
  updateCartAction,
  placeOrderAction,
} from "../state/actions/CartActions";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    { addToCartAction, removeFromCartAction, updateCartAction, placeOrderAction },
    dispatch
  );
};

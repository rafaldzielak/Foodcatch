import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCartAction, removeFromCartAction, updateCartAction } from "../state/actions/CartActions";
import { placeOrderAction } from "../state/actions/OrderActions";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    { addToCartAction, removeFromCartAction, updateCartAction, placeOrderAction },
    dispatch
  );
};

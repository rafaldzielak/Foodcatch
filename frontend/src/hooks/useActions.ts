import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCartAction, removeFromCartAction } from "../state/actions/CartActions";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...addToCartAction, ...removeFromCartAction }, dispatch);
};

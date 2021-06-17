import AddressComponent from "../components/AddressComponent";
import { OrderComponent } from "../components/OrderComponent";

const OrderScreen = () => {
  return (
    <div className='menu container'>
      <AddressComponent />
      <OrderComponent size='large' />
    </div>
  );
};

export default OrderScreen;

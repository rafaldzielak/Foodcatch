import AddressComponent from "../components/AddressComponent";
import { OrderComponent } from "../components/OrderComponent";

const OrderScreen = () => {
  return (
    <>
      <div className='menu container mt'>
        <OrderComponent size='large' hideButton />
        <AddressComponent />
      </div>
      <button className='wide'>Place Order</button>
    </>
  );
};

export default OrderScreen;

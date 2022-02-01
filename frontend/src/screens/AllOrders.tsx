import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { OrdersResponse } from "../models/order";
import { getOrdersQuery } from "../queries/orderQueries";
import { convertStringDateToDate } from "../state/actions/OrderActions";
import "./AllOrders.scss";

const AllOrders = () => {
  const { data, loading, error } = useQuery<{ getOrders: OrdersResponse }>(getOrdersQuery);

  if (loading) return <Loader />;
  return (
    <div className='container all-orders'>
      {error && <Alert hideCloseBtn>{error.message}</Alert>}
      <table>
        <thead>
          <th>ID</th>
          <th>Email</th>
          <th>Date</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Dishes</th>
          <th>Payment</th>
          <th>Address</th>
        </thead>
        <tbody>
          {data?.getOrders?.orders.map((order) => {
            const {
              id,
              email,
              date,
              firstName,
              surname,
              phone,
              dishes,
              paymentMethod,
              city,
              street,
              streetNumber,
            } = order;
            return (
              <tr key={order.id}>
                <td>{id}</td>
                <td>{email}</td>
                <td>{format(convertStringDateToDate(date), "dd.MM.yyyy hh:mm")}</td>
                <td>{`${firstName} ${surname}`}</td>
                <td>{phone}</td>
                <td>{dishes.length}</td>
                <td>{paymentMethod[0].toUpperCase() + paymentMethod.substring(1)}</td>
                <td>{`${street} ${streetNumber}, ${city}`}</td>
                <td>
                  <Link to={`/summary/${id}`}>
                    <button>Details</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {console.log(data?.getOrders)}
    </div>
  );
};

export default AllOrders;

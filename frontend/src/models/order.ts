import { Dish } from "../state/actionInterfaces";

export interface Order {
  id: string;
  date: Date;
  phone: string;
  dishes: [Dish];
  firstName: string;
  surname: string;
  email: string;
  street: string;
  streetNumber: string;
  city: string;
  paymentMethod: "cash" | "card";
  paymentUrl: string;
  couponAppliedPercentage: number;
  isPaid: boolean;
  isDelivered: boolean;
  orderPaymentProvider: "stripe" | "paypal";
  orderPaymentId: string;
}

export interface OrdersResponse {
  orders: Order[];
  count: number;
  page: number;
  allPages: number;
}

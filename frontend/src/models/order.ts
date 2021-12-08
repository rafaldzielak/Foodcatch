export interface Order {
  date: Date;
  phone: string;
  dish: DishWithNumber;
  firstName: string;
  surname: string;
  street: string;
  streetNumber: string;
  city: string;
  paymentMethod: "cash" | "card";
}

interface DishWithNumber {
  name: string;
  img?: string;
  price: number;
  amount: number;
}

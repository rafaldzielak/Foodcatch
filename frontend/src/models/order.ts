export interface Order {
  id: String;
  date: Date;
  phone: string;
  dishes: [DishWithNumber];
  firstName: string;
  surname: string;
  street: string;
  streetNumber: string;
  city: string;
  paymentMethod: "cash" | "card";
}

interface DishWithNumber {
  name: string;
  imgURL?: string;
  price: number;
  quantity: number;
}

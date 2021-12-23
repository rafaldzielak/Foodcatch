export type DishType = "Appetizers" | "Soups" | "Main Dishes" | "Desserts";

export interface DishAttrs {
  id: string;
  quantity: number;
  price: number;
  name: string;
  description: string;
  isVege: boolean;
  isSpicy: boolean;
  imgURL?: string;
  type: DishType;
}

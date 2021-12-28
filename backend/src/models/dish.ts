export type DishType = "Appetizers" | "Soups" | "Main Dishes" | "Desserts";

export interface DishAttrs {
  price: number;
  name: string;
  description: string;
  isVege: boolean;
  isSpicy: boolean;
  imgURL?: string;
  type: DishType;
}

export interface DishSelectAttrs extends DishAttrs {
  id: string;
  quantity: number;
}

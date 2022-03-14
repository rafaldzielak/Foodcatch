export const setLSCartItems = (items: Array<any>) => {
  console.log(items);
  localStorage.setItem("cart", JSON.stringify(items));
};

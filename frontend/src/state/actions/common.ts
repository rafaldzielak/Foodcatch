export const setLSCartItems = (items: []) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

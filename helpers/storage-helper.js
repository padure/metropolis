const getProductsFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const updateLS = (key, values) => {
  localStorage.setItem(key, JSON.stringify(values));
};

const CART_PRODUCTS_KEY = "cart-products";

export { getProductsFromLS, updateLS, CART_PRODUCTS_KEY };

const CART_PRODUCTS_KEY = "cart-products";

const useLocalStorage = (key) => {
  const getValue = () => {
    return JSON.parse(localStorage.getItem(key));
  };
  const setValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [getValue, setValue];
};

export { useLocalStorage, CART_PRODUCTS_KEY };

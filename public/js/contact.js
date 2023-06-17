import {
  CART_PRODUCTS_KEY,
  useLocalStorage,
} from "../js/helpers/storage-helper.js";

const productsCounter = document.querySelector("#items-count");

const [getProducts] = useLocalStorage(CART_PRODUCTS_KEY);

const updateProductsCounter = (value) => {
  productsCounter.innerText = `${value}`;
};

const cartProducts = getProducts() || [];
updateProductsCounter(cartProducts.length);

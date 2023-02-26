import {
  getProductsFromLS,
  CART_PRODUCTS_KEY,
} from "../../helpers/storage-helper.js";

const productsCounter = document.querySelector("#items-count");

const updateProductsCounter = (value) => {
  productsCounter.innerText = `${value}`;
};

const cartProducts = getProductsFromLS(CART_PRODUCTS_KEY) || [];
updateProductsCounter(cartProducts.length);

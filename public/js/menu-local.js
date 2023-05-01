import {
  getProductsFromLS,
  CART_PRODUCTS_KEY,
} from "../js/helpers/storage-helper.js";
import { backTop } from "../js/helpers/scroll.js";

const navbar = document.querySelector(".navbar");
const backToTop = document.querySelector("#btn-back-to-top");

window.onscroll = () => {
  window.scrollY > 50
    ? backToTop.classList.remove("d-none")
    : backToTop.classList.add("d-none");
};

backToTop.addEventListener("click", () => backTop());

const productsCounter = document.querySelector("#items-count");

const updateProductsCounter = (value) => {
  productsCounter.innerText = `${value}`;
};

const cartProducts = getProductsFromLS(CART_PRODUCTS_KEY) || [];
updateProductsCounter(cartProducts.length);

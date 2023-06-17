import {
  CART_PRODUCTS_KEY,
  useLocalStorage,
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

const [getProducts] = useLocalStorage(CART_PRODUCTS_KEY);

const updateProductsCounter = (value) => {
  productsCounter.innerText = `${value}`;
};

const cartProducts = getProducts() || [];
updateProductsCounter(cartProducts.length);

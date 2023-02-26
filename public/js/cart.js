import {
  getProductsFromLS,
  updateLS,
  CART_PRODUCTS_KEY,
} from "../../helpers/storage-helper.js";
import { Card } from "../../components/cart-card.js";

const productsContainer = document.querySelector("#cart_items");
const itemsCounter = document.querySelector("#items-count");
const productsCounter = document.querySelector("#products-counter");

const getProducts = async () => {
  let response = await fetch("./data/produse.json");
  let products = response.json();

  return products;
};

const products = await getProducts();
let productsFromLS = getProductsFromLS(CART_PRODUCTS_KEY);

let cartProducts = products.filter((product) =>
  productsFromLS.includes(product.id)
);

const updateProductsCounter = (value) => {
  productsCounter.textContent = `${cartProducts.length} produse`;
};
const updateItemsCounter = (value) => {
  itemsCounter.textContent = `${cartProducts.length}`;
};

updateItemsCounter(cartProducts.length);
updateProductsCounter(cartProducts.length);

// ! Render cards method
const render = (data) => {
  let productHTML = "";
  data.map((product) => {
    productHTML += Card(product);
  });
  productsContainer.innerHTML = productHTML;
};

const removeProduct = (id) => {
  cartProducts = cartProducts.filter((product) => product.id != id);
  productsFromLS = cartProducts.map((product) => product.id);
  updateLS(CART_PRODUCTS_KEY, productsFromLS);
};

render(cartProducts);

const closeBtns = document.querySelectorAll("#close-btn");

closeBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    let parent = event.target.parentNode.parentNode.parentNode;
    let id = parent.dataset.id;
    removeProduct(id);
    productsContainer.removeChild(parent);
    updateItemsCounter(cartProducts.length);
    updateProductsCounter(cartProducts.length);
  });
});

const totalPrice = document.querySelector("#total-price");
const finalPrice = document.querySelector("#final-price");
const stepUpButtons = document.querySelectorAll("#step-up");
const stepDownButtons = document.querySelectorAll("#step-down");

const SHIPPING_COST = 50;

// ! Calculate total price of products
const calculateTotal = () =>
  cartProducts.reduce((total, currentValue) => total + currentValue.pret, 0);

let totalSum = calculateTotal();

const setTotalPrice = (value) => {
  totalPrice.innerText = `${value} mdl`;
};
const setFinalPrice = (value) => {
  finalPrice.innerText = `${value} mdl`;
};

setTotalPrice(totalSum);
setFinalPrice(totalSum + SHIPPING_COST);

stepUpButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let parent = event.target.parentNode.parentNode.parentNode;
    let priceElement = parent.querySelector("#product-price");
    let price = parseInt(priceElement.textContent);
    let quatityElement = parent.querySelector("#quantity-input");
    let quatity = parseInt(quatityElement.value);
    increasePrice(price);
    setTotalPrice(totalSum);
    setFinalPrice(totalSum + SHIPPING_COST);
  });
});

stepDownButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let parent = event.target.parentNode.parentNode.parentNode;
    let priceElement = parent.querySelector("#product-price");
    let price = parseInt(priceElement.textContent);
    let quatityElement = parent.querySelector("#quantity-input");
    let quatity = parseInt(quatityElement.value);
    decreasePrice(price);
    setTotalPrice(totalSum);
    setFinalPrice(totalSum + SHIPPING_COST);
  });
});

const increasePrice = (value) => {
  totalSum += value;
};

const decreasePrice = (value) => {
  totalSum -= value;
};

// Send Command to email
const validateEmail = (email) => {
  let pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
};

const contactEmailElement = document.querySelector("#contact-email");
const commandButtonElement = document.querySelector("#command-btn");

const sendEmail = (email) => {
  let secureToken = "30eafaa0-4f2f-4ac2-af6d-31de621a0159";
  const cart_items = document.querySelectorAll('.title-item-card')
  const totalPrice = document.getElementById('total-price')
  
  let htmlBody = `
    <h2>Dumneavoastră ați comandat:</h2>
  `
  cart_items.forEach(title=>{
      htmlBody += `<li>${title.innerText}</li>`
  })
  htmlBody += `<p>La prețul total de <b>${totalPrice.innerText}</b></p>`
  Email.send({
    SecureToken: secureToken,
    From: "aurica.apareci@gmail.com",
    To: email,
    Subject: "Metropolis Cahul. Comanda dumneavoastra a fost confirmata !",
    Body: htmlBody,
  }).then((message) => {
    console.log(message);
    if (message === 'OK') {
      alert("Comanda a fost confirmata!");
      location.reload();
      updateLS(CART_PRODUCTS_KEY, []);
    }});
};

commandButtonElement.addEventListener("click", () => {
  let email = contactEmailElement.value;

  validateEmail(email)
    ? sendEmail(email)
    : alert(`${email} este un email invalid`);
});

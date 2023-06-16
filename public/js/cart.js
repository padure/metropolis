import {
  CART_PRODUCTS_KEY,
  useLocalStorage,
} from "../js/helpers/storage-helper.js";
import { Card } from "../../public/js/components/cart-card.js";

const productsContainer = document.querySelector("#cart_items");
const itemsCounter = document.querySelector("#items-count");
const productsCounter = document.querySelector("#products-counter");
const totalCost = document.querySelector("#total-price");
const finalPrice = document.querySelector("#final-price");

const [getProducts, setProducts] = useLocalStorage(CART_PRODUCTS_KEY);
let cartProducts = getProducts();

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

const renderSubtotal = () => {
  let totalPrice = 0,
    totalItems = 0;
  cartProducts.forEach((product) => {
    totalPrice += product.pret * product.quantity;
    totalItems += product.quantity;
  });

  productsCounter.textContent = `${totalItems} produse`;
  totalCost.textContent = `${totalPrice} mdl`;
  finalPrice.textContent = `${totalPrice + 50} mdl`;
};

const removeProduct = (id) => {
  cartProducts = cartProducts.filter((product) => product.id != id);
  setProducts(cartProducts);
};

render(cartProducts);
renderSubtotal();

const closeBtns = document.querySelectorAll("#close-btn");

closeBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    let parent = event.target.parentNode.parentNode;
    let id = parent.dataset.id;
    removeProduct(id);
    productsContainer.removeChild(parent);
    updateItemsCounter(cartProducts.length);
    updateProductsCounter(cartProducts.length);
    renderSubtotal();
  });
});

const stepUpButtons = document.querySelectorAll("#step-up");
const stepDownButtons = document.querySelectorAll("#step-down");

stepUpButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let parent = event.target.parentNode.parentNode.parentNode;
    const id = parent.dataset.id;
    console.log(id);

    const product = cartProducts.find((product) => product.id === id);
    product.quantity++;
    renderSubtotal();
  });
});

stepDownButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let parent = event.target.parentNode.parentNode.parentNode;
    const id = parent.dataset.id;
    console.log(id);

    const product = cartProducts.find((product) => product.id === id);
    product.quantity > 1 && product.quantity--;
    renderSubtotal();
  });
});

// Send Command to email
const validateEmail = (email) => {
  let pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
};

const contactEmailElement = document.querySelector("#contact-email");
const commandButtonElement = document.querySelector("#command-btn");

const sendEmail = (email) => {
  let secureToken = "838d9357-3784-486f-95cf-9bd2a9883e64";
  const cart_items = document.querySelectorAll(".title-item-card");
  const totalPrice = document.getElementById("total-price");

  let htmlBody = `
    <h2>Dumneavoastră ați comandat:</h2>
  `;
  cart_items.forEach((title) => {
    htmlBody += `<li>${title.innerText}</li>`;
  });
  htmlBody += `<p>La prețul total de <b>${totalPrice.innerText}</b></p>`;
  Email.send({
    SecureToken: secureToken,
    From: "metropolis.cahul@gmail.com",
    To: email,
    Subject: "Metropolis Cahul. Comanda dumneavoastra a fost confirmata !",
    Body: htmlBody,
  }).then((message) => {
    console.log(message);
    if (message === "OK") {
      alert("Comanda a fost confirmata!");
      location.replace("/pages/menu/");
      updateLS(CART_PRODUCTS_KEY, []);
    }
  });
};

commandButtonElement.addEventListener("click", () => {
  let email = contactEmailElement.value;

  validateEmail(email)
    ? sendEmail(email)
    : alert(`${email} este un email invalid`);
});

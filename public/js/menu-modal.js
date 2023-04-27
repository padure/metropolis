import {
  getProductsFromLS,
  updateLS,
  CART_PRODUCTS_KEY,
} from "../js/helpers/storage-helper.js";
import ListItem from "./components/list-item.js";
import CategoryCard from "./components/category-card.js";
import Card from "./components/card.js";

const spinner = document.querySelector("#bg-spinner");
const productsCounter = document.querySelector("#items-count");
const backToTop = document.querySelector("#btn-back-to-top");
const categoriesContainer = document.querySelector("#category-links");
const categoriesMobileContainer = document.querySelector("#mobile-categories");
const carouselContainer = document.querySelector("#carousels");

window.onscroll = () => {
  window.scrollY > 50
    ? backToTop.classList.remove("d-none")
    : backToTop.classList.add("d-none");
};
const backTop = () => {
  console.log("clicked");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

backToTop.addEventListener("click", () => backTop());

const getProducts = async () => {
  let response = await fetch("../../data/produse.json");
  let data = response.json();

  return data;
};

spinner.classList.add("d-block");

let products = await getProducts();
const categories = new Set(products.map((product) => product.categorie));

categories.forEach((category) => {
  categoriesContainer.insertAdjacentHTML("beforeend", ListItem(category));
  const product = products.find((product) => product.categorie == category);

  categoriesMobileContainer.insertAdjacentHTML(
    "beforeend",
    CategoryCard(product)
  );
});

const priceFormatter = Intl.NumberFormat("ro", {
  style: "currency",
  currency: "MDL",
});
const quantityFormatter = Intl.NumberFormat("ro", {
  style: "unit",
  unit: "gram",
});

categories.forEach((category) => {
  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("container");

  const categoryHeader = document.createElement("div");
  categoryHeader.id = category.toLowerCase();
  categoryHeader.classList.add("py-1", "my-3", "border-bottom");

  const categoryTitle = document.createElement("h1");
  categoryTitle.textContent = category;
  categoryTitle.classList.add("font-second-bold", "display-5");

  const slider = document.createElement("div");
  slider.classList.add("row", "owl-carousel", "owl-theme", "card-group");

  products
    .filter((product) => product.categorie == category)
    .forEach((product) => {
      slider.insertAdjacentHTML(
        "beforeend",
        Card(product, {
          priceFormatter: priceFormatter,
          quantityFormatter: quantityFormatter,
        })
      );
    });

  categoryHeader.appendChild(categoryTitle);
  categoryContainer.appendChild(categoryHeader);
  categoryContainer.appendChild(slider);
  carouselContainer.appendChild(categoryContainer);
});

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    let productId = card.dataset.id;
    let product = products.find((product) => product.id == productId);

    const modal_view_product = document.querySelector(".my-modal-s");
    const modalContentTest = new bootstrap.Modal(modal_view_product);

    const modal_image = document.getElementById("product-image");
    const modal_title = document.getElementById("product-title");
    const modal_description = document.getElementById("product-description");
    const modal_weight = document.getElementById("product-weight");
    const modal_price = document.getElementById("product-price");
    const modal_add_to_cart_id = document.getElementById("add-to-cart-button");

    modal_image.src = product.img;
    modal_title.textContent = product.nume;
    modal_description.textContent = product.descriere;
    modal_weight.textContent = quantityFormatter.format(product.cantitate);
    modal_price.textContent = priceFormatter.format(product.pret);
    modal_add_to_cart_id.setAttribute("data-md-id", product?.id);

    modalContentTest.show();
  });
});

$(`.owl-carousel`).owlCarousel({
  loop: true,
  margin: 5,
  animateOut: "slideOutDown",
  animateIn: "flipInX",
  nav: true,
  dots: false,
  autoWidth: true,
  navText: [
    '<span class="fas fa-angle-left fa-lg"></span>',
    '<span class="fas fa-angle-right fa-lg"></span>',
  ],
});

spinner.classList.add("d-none");

const updateProductsCounter = (value) => {
  productsCounter.innerText = `${value}`;
};
const cartProducts = getProductsFromLS(CART_PRODUCTS_KEY) || [];
updateProductsCounter(cartProducts.length);

const addToCartBtn = document.querySelector("#add-to-cart-button");

addToCartBtn.addEventListener("click", () => {
  const id = addToCartBtn.dataset.mdId;
  cartProducts.unshift(id);
  const uniqueProducts = new Set(cartProducts);
  updateLS(CART_PRODUCTS_KEY, [...uniqueProducts]);
  updateProductsCounter(uniqueProducts.size);
});

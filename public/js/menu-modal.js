import {
  getProductsFromLS,
  updateLS,
  CART_PRODUCTS_KEY,
} from "../../helpers/storage-helper.js";

const productsCounter = document.querySelector("#items-count");

fetch("data/produse.json")
  .then((response) => response.json())
  .then((items) => {
    const categories = new Set(items.map((item) => item.categorie));
    const links = Array.from(categories).map((category) => {
      const link = document.createElement("a");
      link.href = `#${category}`;
      link.textContent = category;
      link.classList.add("nav-link", "nav-menu-item");
      link.id = `category-${category}`;
      return link;
    });
    const container = document.getElementById("category-links");
    links.forEach((link) => container.appendChild(link));
  })
  .catch((error) => console.error(error));

//generating the category and the carousel for each category
fetch("data/produse.json")
  .then((response) => response.json())
  .then((items) => {
    const categories = new Set(items.map((item) => item.categorie));
    const container = document.getElementById("carousels");

    [...categories].forEach((category, key) => {
      const categoryContainer = document.createElement("div");
      categoryContainer.classList.add("container", "mt-80");
      const categorySection = document.createElement("div");
      categorySection.id = category;
      categorySection.classList.add("mt-3");
      let catSectClass = (key === 0)?"pt-1":"pt-10"
      categorySection.classList.add(`${catSectClass}`);
      //generating the headings
      const heading = document.createElement("h2");
      heading.classList.add('category-title-carousel');
      heading.textContent = category;
      categorySection.appendChild(heading);

      const hr = document.createElement("hr");
      categorySection.appendChild(hr);

      const cardContainer = document.createElement("div");
      cardContainer.classList.add(
        "row",
        "owl-carousel",
        "owl-theme",
        "card-group"
      );

      //generating the items of carousel
      items
        .filter((item) => item.categorie === category)
        .forEach((item) => {
          const card = document.createElement("div");
          card.classList.add("col-auto", "mx-0");

          const cardBody = document.createElement("div");
          cardBody.classList.add("card", "mb-4", "bg-dark");
          cardBody.setAttribute("data-bs-toggle", "modal");
          cardBody.setAttribute("data-bs-target", `#product_view_${item.id}`);

          const cardImage = document.createElement("img");
          cardImage.classList.add("rounded-top", "card-image-menu");
          cardImage.setAttribute("height", "320px");
          cardImage.setAttribute("width", "230px");
          cardImage.setAttribute("src", item.img);
          cardBody.appendChild(cardImage);

          const cardText = document.createElement("div");
          cardText.classList.add("card-body", "p-3", "my-2");

          const cardTitle = document.createElement("h5");
          cardTitle.classList.add("my-2");
          let title = "";
          if (document.body.offsetWidth > 1100) {
            title =
              item.nume.length < 18
                ? item.nume
                : `${item.nume.substring(0, 12)} ...`;
          } else {
            title = item.nume;
          }
          cardTitle.textContent = `${title}`;
          cardTitle.setAttribute("data-bs-toggle", "tooltip");
          cardTitle.setAttribute("data-bs-placement", "top");
          cardTitle.setAttribute("title", item.nume);
          cardText.appendChild(cardTitle);

          const cardPrice = document.createElement("p");
          cardPrice.classList.add("my-0", "mb-2");
          cardPrice.textContent = item.pret + " mdl";
          cardText.appendChild(cardPrice);

          const cardButton = document.createElement("div");
          cardButton.classList.add(
            "justify-content-between",
            "align-items-center"
          );

          const buttonContainer = document.createElement("div");
          buttonContainer.classList.add("px-2", "my-0");

          const orderButton = document.createElement("button");
          orderButton.classList.add("btn", "btn-outline-secondary");
          orderButton.setAttribute("type", "button");
          orderButton.innerHTML =
            '<b>Precomanda</b> <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>';
          buttonContainer.appendChild(orderButton);

          cardButton.appendChild(buttonContainer);
          cardText.appendChild(cardButton);
          cardBody.appendChild(cardText);
          card.appendChild(cardBody);
          cardContainer.appendChild(card);
          card.addEventListener("click", (e) => {
            e.preventDefault();
            const modal_view_product = document.querySelector(".my-modal-s");
            const modalContentTest = new bootstrap.Modal(modal_view_product);

            const modal_image = document.getElementById("product-image");
            const modal_title = document.getElementById("product-title");
            const modal_description = document.getElementById(
              "product-description"
            );
            const modal_weight = document.getElementById("product-weight");
            const modal_price = document.getElementById("product-price");
            const modal_add_to_cart_id =
              document.getElementById("add-to-cart-button");

            modal_image.src = item.img;
            modal_title.textContent = item.nume;
            modal_description.textContent = item.descriere;
            modal_weight.textContent = `${item.cantitate} g`;
            modal_price.textContent = `${item.pret} mdl`;
            modal_add_to_cart_id.setAttribute("data-md-id", item?.id);

            modalContentTest.show();
          });
        });

      categoryContainer.appendChild(categorySection);
      categoryContainer.appendChild(cardContainer);
      container.appendChild(categoryContainer);

      //owlCarousel for cards
      $(`.owl-carousel`).owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        dots: false,
        navText: [
          '<span class="fas fa-angle-left fa-lg"></span>',
          '<span class="fas fa-angle-right fa-lg"></span>',
        ],
        responsive: {
          0: {
            items: 1,
          },
          800: {
            items: 2,
          },
          1100: {
            items: 2,
          },
          1400: {
            items: 4,
          },
        },
      });
    });
  })
  .catch((error) => console.error(error));

function fetchData() {
  const spinner = document.getElementById("bg-spinner");
  spinner.style.display = "block";
  setTimeout(() => {
    spinner.style.display = "none";
  }, 2000);
}
fetchData();

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

import {
  getProductsFromLS,
  CART_PRODUCTS_KEY,
} from "../js/helpers/storage-helper.js";

const navbar = document.querySelector(".navbar");
const productsCounter = document.querySelector("#items-count");
const toastLiveExample = document.getElementById("cookie-toast");

window.addEventListener("scroll", () => {
  window.scrollY > 100
    ? navbar.classList.add("dark-version")
    : navbar.classList.remove("dark-version");
});

//cookie functions
$(document).ready(function () {
  var cookie = false;
  var cookieContent = $(".cookie-disclaimer");

  checkCookie();

  if (cookie === true) {
    cookieContent.hide();
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  function checkCookie() {
    var check = getCookie("acookie");
    if (check !== "") {
      return (cookie = true);
    } else {
      return (cookie = false);
    }
  }
  $(".accept-cookie").click(function () {
    setCookie("acookie", "accepted", 1);
    cookieContent.hide(500);
  });
});

const updateProductsCounter = (value) => {
  productsCounter.innerText = `${value}`;
};
const cartProducts = getProductsFromLS(CART_PRODUCTS_KEY) || [];
console.log(cartProducts);
updateProductsCounter(cartProducts.length);

$(".owl-carousel").owlCarousel({
  margin: 5,
  nav: true,
  dots: false,
  responsiveClass: true,
  navText: [
    '<i class="far fa-chevron-left"></i>',
    '<i class="far fa-chevron-right"></i>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    1000: {
      items: 3,
    },
  },
});

setTimeout(() => {
  const toast = new bootstrap.Toast(toastLiveExample);

  toast.show();
  // console.log(toastLiveExample);
  // toastLiveExample.classList.add("show");
}, 3000);

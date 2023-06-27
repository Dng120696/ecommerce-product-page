"use strict";

// NAV MENU
const openMenu = document.querySelector(".open-menu img");
const closeMenu = document.querySelector(".close-menu img");
const menuLinks = document.querySelector(".menu-links");
const overlay = document.querySelector(".overlay");

const closeLinks = () => {
  menuLinks.classList.remove("show-menu");
  overlay.classList.remove("show-overlay");
  imageSection.classList.remove("active");
};
openMenu.addEventListener("click", () => {
  menuLinks.classList.add("show-menu");
  overlay.classList.add("show-overlay");
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuLinks.classList.contains("show-menu")) {
    closeLinks();
  }
});
closeMenu.addEventListener("click", closeLinks);
overlay.addEventListener("click", closeLinks);

//////////-----------------/////////////
// SLIDE SECTION

const imgSlide = document.querySelectorAll(".slide-img");
const previousBtn = document.querySelector(".previous--btn");
const nextBtn = document.querySelector(".next--btn");
let currSlide = 0;
const maxSlide = imgSlide.length - 1;
const goToSlide = (curr) => {
  imgSlide.forEach(
    (img, i) => (img.style.transform = `translateX(${100 * (i - curr)}%)`)
  );
};
goToSlide(0);

const nextSlide = () => {
  currSlide === maxSlide ? (currSlide = 0) : currSlide++;
  goToSlide(currSlide);
  product(currSlide);
  thumbnails(currSlide);
};
const previousSlide = () => {
  currSlide === 0 ? (currSlide = maxSlide) : currSlide--;
  goToSlide(currSlide);
  product(currSlide);
  thumbnails(currSlide);
};
nextBtn.addEventListener("click", nextSlide);
previousBtn.addEventListener("click", previousSlide);

// PURCHASE SECTION
const decrementBtn = document.querySelector(".decrement-btn");
const incrementBtn = document.querySelector(".increment-btn");
const pieceValue = document.querySelector(".piece-value");

let quantity = parseInt(pieceValue.innerHTML);

decrementBtn.addEventListener("click", () => {
  if (quantity <= 0) return;
  quantity--;
  pieceValue.textContent = quantity;
});
incrementBtn.addEventListener("click", () => {
  quantity++;
  pieceValue.textContent = quantity;
});

// CART BOX
const cartBox = document.querySelector(".cart-box");
const mainContainer = document.querySelector(".main-container");

const cartContainer = document.querySelector(".cart-container");
cartBox.addEventListener("click", () => {
  console.log("click");
  cartContainer.classList.toggle("show-cart");
});

let purchaseval = [];
// BTN CART
const btnCart = document.querySelector(".btn-add-to-cart");
const basketBox = document.querySelector(".basket-box");

const addPurchase = (purchase) => {
  basketBox.innerHTML = "";
  purchase.forEach((item, i) => {
    if (quantity >= 1) {
      const slideIndex = i % (maxSlide + 1); // Calculate the slide index using modulo operator
      if (slideIndex <= maxSlide) {
        document.querySelector(".basket-empty")?.remove();
        const html = `<div class = 'items-purchase flex flex-col'>
          <div class = 'item flex'>
            <img src = './images/image-product-${
              slideIndex + 1
            }.jpg' class = 'img-item'>
            <p>
            <span class = 'item-name'>
            Fall Limited Edition Sneakers
            </span>
            <span class = 'item-price'>
            $125.00 x ${item}
            </span>
            <span class = 'font-bold'>
              $${(125 * item).toFixed(2)}
             </span>
            </p>
            <img src = './images/icon-delete.svg' class='delete-box' data-del = '${i}'>
          </div>
          <button class = 'btn btn-checkout'>Checkout</button>
        </div>`;
        basketBox.insertAdjacentHTML("afterbegin", html);
      }
    } else {
      return;
    }
  });
};
const cartCount = document.querySelector(".cart-count");
let total = parseInt(cartCount.textContent);
btnCart.addEventListener("click", () => {
  if (!quantity) return;
  purchaseval.push(quantity);
  addPurchase(purchaseval);
  const totalCount = purchaseval.reduce((acc, curr) => acc + curr);
  total = parseInt(totalCount);
  cartCount.textContent = total;
});

basketBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-box")) {
    const { del } = e.target.dataset;
    total -= purchaseval[del];
    cartCount.textContent = total;
    purchaseval.splice(del, 1);
    addPurchase(purchaseval);
  }

  if (purchaseval.length === 0) {
    const newElement = document.createElement("p");
    newElement.textContent = "Your cart is empty.";
    this.appendChild(newElement);
    cartCount.innerHTML = "";
  }
});

// DESKTOP VIEW
//IMAGE PRODUCT
const imageSection = document.querySelector(".image-section");
const imageProducts = document.querySelector(".image-products");
const imgProducts = document.querySelectorAll(".image-products img");
const imageClose = document.querySelector(".image-close-menu");
// THUMBNAILS
const imageThumbnails = document.querySelector(".image-thumbnails");
const imgThumbnails = document.querySelectorAll(".img-thumbnails");

const product = (el) => {
  imgProducts.forEach((img, i) => {
    img.style.transform = `translateX(${100 * (i - el)}%)`;
  });
};
product(0);
const thumbnails = (el) => {
  imgThumbnails.forEach((thumb) =>
    thumb.classList.remove("img-thumbnails--active")
  );
  document
    .querySelector(`.img-thumbnails[data-index='${el}']`)
    .classList.add("img-thumbnails--active");
};

imageClose.addEventListener("click", () => {
  overlay.classList.remove("show-overlay");
  imageSection.classList.remove("active");
});

imageProducts.addEventListener("click", function (e) {
  const el = e.target;
  // console.log(el);
  if (el.classList.contains("img-product")) {
    const { product } = el.dataset;
    imageSection.classList.add("active");
    overlay.classList.add("show-overlay");
    goToSlide(product);
  }
});

imageThumbnails.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("img-thumbnails")) {
    const { index } = el.dataset;
    imgThumbnails.forEach((thumb) =>
      thumb.classList.remove("img-thumbnails--active")
    );
    el.classList.add("img-thumbnails--active");
    product(index);
  }
});

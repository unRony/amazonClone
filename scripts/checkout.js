import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import deliveryOptions from "../data/deliveryOptions.js";

function renderOrderSummary() {
  checkout();

  let checkoutHtml = "";

  cart.forEach((cartItem) => {
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        matchingProduct = product;
      }
    });
    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (deliveryOptionId === option.id) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    let deliverydate = today
      .add(deliveryOption.deliveryDays, "days")
      .format("dddd, MMMM D");

    checkoutHtml += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
    <div class="delivery-date">
      Delivery date: ${deliverydate}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingProduct.name}
        </div>
        <div class="product-price">
        ${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" 
          data-product-id ="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>
      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((option) => {
      const today = dayjs();
      let deliverydate = today
        .add(option.deliveryDays, "days")
        .format("dddd, MMMM D");
      let price =
        option.priceCents === 0
          ? "Free"
          : `$${formatCurrency(option.priceCents)}`;
      const isChecked = option.id === cartItem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option" 
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${option.id}">
          <input type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input js-delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${deliverydate}
            </div>
            <div class="delivery-option-price">
              ${price} - Shipping
            </div>
          </div>
        </div>`;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = checkoutHtml;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      checkout();
    });
  });

  function checkout() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${cartQuantity} items`;
  }

  document.querySelectorAll(".js-delivery-option").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId, deliveryOptionId } = button.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      console.log(cart);
      renderOrderSummary();
    });
  });
}

renderOrderSummary();

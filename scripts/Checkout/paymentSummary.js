import { cart } from "../../data/cart.js";
export function renderPaymentSummary() {
  let itemPrice = 0;
  cart.forEach((cartItem) => {
    itemPrice += cartItem.priceCents * cartItem.quantity;
  });
}

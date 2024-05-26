export let cart = JSON.parse(localStorage.getItem('cart'))
    if (!cart) {
        cart = [{
            productId :'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity : 2,
        },
        {
            productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity : 1,
        }]
    };

export function addToCart(productId) {
    let matchingcartItem;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingcartItem = cartItem ;
        }} )
        if (matchingcartItem) {
            matchingcartItem.quantity += 1;
        } else {
        cart.push({
            productId : productId,
            quantity : 1,
        });
        }
        updateCartQuantity();
        saveToStorage()

}
    function updateCartQuantity() {
        let cartQuantity = 0;
        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        } )
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    };

export function saveToStorage() {
    localStorage.setItem('cart',JSON.stringify(cart))
}

export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
        
    } )
    cart = newCart;
    saveToStorage()
        console.log(cart);
}

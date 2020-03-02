const uuid = require('uuid');

let cartItems = [
    {
        'cartItem_Id': uuid.v4(),
        'cart_Id': uuid.v4(),
        'quantity': 4
    }
];

 const selectCartItems  = () => ({
     rows: cartItems,
     error: new Error(),
     driver: 'postgres'
 });

 const selectCartItemByCartItemId = (cartItemId) =>
     cartItems.find((cartItem) => cartItem['cartItem_Id'] === cartItemId);

 const selectCartItemByCartId = (cartId) =>
     cartItems.find((cartItem) => cartItem['cart_Id'] === cartId);

 module.exports = {
   selectCartItems,
   selectCartItemByCartId,
   selectCartItemByCartItemId
 };

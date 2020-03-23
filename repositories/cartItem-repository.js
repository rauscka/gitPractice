const uuid = require('uuid');

const cartItems = [
    {
        'cart_Id': uuid.v4(),
        'cartItem_Id': uuid.v4(),
        'quantity': 4
    }
];

 const selectCartItems = () => ({
     driver: 'postgres',
     error: new Error(),
     rows: cartItems
 });

 const selectCartItemByCartItemId = (cartItemId) =>
     cartItems.find((cartItem) => cartItem['cartItem_Id'] === cartItemId);

 const selectCartItemByCartId = (cartId) =>
     cartItems.find((cartItem) => cartItem['cart_Id'] === cartId);

 module.exports = {
   selectCartItemByCartId,
   selectCartItemByCartItemId,
   selectCartItems
 };

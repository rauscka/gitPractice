const{
    selectCartItems,
    selectCartItemByCartItemId,
    selectCartItemByCartId
} = require('../repositories/cartItem-repository');

const mapToModel = (cartItem) => ({
    cartItemId: cartItem['cartItem_Id'],
    cartId: cartItem['cart_Id'],
    quantity: cartItem['quantity']
});

const getAllCartItems = () => {
    const {rows} = selectCartItems();

    return rows.map(mapToModel);
};

const getCartItemsByCartItemId = (cartItemId) => {
    const cartItems = selectCartItemByCartItemId(cartItemId);

    return mapToModel(cartItems);
};

const getCartItemsByCartId = (cartId) => {
  const {rows} = selectCartItemByCartId(cartId);

  return rows.map(mapToModel);
};

module.exports = {
  getAllCartItems,
  getCartItemsByCartId,
  getCartItemsByCartItemId
};

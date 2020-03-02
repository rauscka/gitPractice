const {
    getAllCartItems,
    getCartItemsByCartItemId,
    getCartItemsByItemId
} = require('../services/cartItem-service');

const getCartItemsRoute = (server) => {
    server.route({
        path: '/cartItems',
        method: 'GET',
        handler: (request, h) => {

            return getAllCartItems();
        }
    });
};

const getCartItemsByItemIdRoute = (server) => {
    server.route({
        path: '/cartItems/{cartItemId}',
        method: 'GET',
        handler: (request, h) => {
            const cartItems = getCartItemsByItemId(request.params.cartItemId);
            if(!cartItems) {
                return h.response().code(404);
            }

            return cartItems();
        }
    });
};

const getCartItemsByCartItemIdRoute = (server) => {
    server.route({
        path: '/cartItems/{cartItemId}',
        method: 'GET',
        handler: (request, h) => {
            const cartItemId = getCartItemsByCartItemId(request.params.cartItemId);

            if (!cartItemId) {
                return h.response().code(404);
            }

            return cartItemId;
        }
    });
};

const initCartItemControllers = (server) => {
    getCartItemsRoute(server);
    getCartItemsByItemIdRoute(server);
    getCartItemsByCartItemIdRoute(server);
};

module.exports = {
    initCartItemControllers
};

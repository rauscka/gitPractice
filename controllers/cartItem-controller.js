const {
    getAllCartItems,
    getCartItemsByCartItemId,
    getCartItemsByItemId
} = require('../services/cartItem-service');

const getCartItemsRoute = (server) => {
    server.route({
        handler: () => getAllCartItems(),
        method: 'GET',
        path: '/cartItems'
    });
};

const getCartItemsByItemIdRoute = (server) => {
    server.route({
        handler: (request, h) => {
            const cartItems = getCartItemsByItemId(request.params.cartItemId);

            if (!cartItems) {
                return h.response().code(404);
            }

            return cartItems();
        },
        method: 'GET',
        path: '/cartItems/{cartItemId}'
    });
};

const getCartItemsByCartItemIdRoute = (server) => {
    server.route({
        handler: (request, h) => {
            const cartItemId = getCartItemsByCartItemId(request.params.cartItemId);

            if (!cartItemId) {
                return h.response().code(404);
            }

            return cartItemId;
        },
        method: 'GET',
        path: '/cartItems/{cartItemId}'
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

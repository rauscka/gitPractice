const Hapi = require('@hapi/hapi');
const uuid = require('uuid');
const {when} = require('jest-when');

const {initCartControllers} = require('../../controllers/cart-controller');
const {getAllCarts, getCartByCartId, getCartsByCustomerId} = require('../../services/cart-service');

jest.mock('../../services/customer-service');
jest.mock('../../services/cart-service');

describe('cart controller', () => {
    let fakeServer,
        expectedCartId,
        expectedCustomerId,
        expectedCart,
        expectedCarts;

    beforeAll(() => {
        fakeServer = Hapi.server({
            host: 'localhost',
            port: 3000
        });

        expectedCartId = uuid.v4();
        expectedCustomerId = uuid.v4();

        expectedCart = {
            cartId: expectedCartId,
            customerId: expectedCustomerId
        };
        expectedCarts = [expectedCartId, expectedCustomerId];

        getAllCarts.mockReturnValue(expectedCarts);

        when(getCartByCartId)
            .calledWith(expectedCartId)
            .mockReturnValue(expectedCart);

        when(getCartsByCustomerId)
            .calledWith(expectedCustomerId)
            .mockReturnValue(expectedCarts);

        initCartControllers(fakeServer);
    });

    it('should return all carts', async () => {
        const response = await fakeServer.inject({
            method: 'GET',
            url: '/carts'
        });

        expect(response.statusCode).toEqual(200);
        expect(response.result).toEqual(expectedCarts);
    });

    it('should return carts by customerId', async () => {
        const response = await fakeServer.inject({
            method: 'GET',
            url: `/carts/${expectedCustomerId}`
        });

        expect(getCartsByCustomerId).toHaveBeenCalledWith(expectedCustomerId);

        expect(response.statusCode).toEqual(200);
        expect(response.result).toEqual(expectedCarts);
    });

    it('should return NOT_FOUND if a cart does not exist', async () => {
        const randomCartId = uuid.v4();

        const response = await fakeServer.inject({
            method: 'GET',
            url: `/carts/${randomCartId}`
        });

        expect(getCartByCartId).toHaveBeenCalledWith(randomCartId);
        expect(response.statusCode).toEqual(404);
    });
});

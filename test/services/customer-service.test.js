const {
    getAllCustomers,
    getCustomerByCustomerId
} = require('../../services/customer-service');
const {
    selectCustomerByCustomerId,
    selectCustomers
} = require('../../repositories/customer-repository');

jest.mock('../../repositories/customer-repository');

describe('getAllCustomers', () => {
    let expectedCustomerId,
        expectedCustomerFirstName,
        expectedCustomerLastName,
        expectedCustomerEmail,
        expectedCustomer;

    beforeEach(() => {
        expectedCustomerId = 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28';
        expectedCustomerFirstName = 'Karl';
        expectedCustomerLastName = 'Rauschenberger';
        expectedCustomerEmail = 'karl.rauschenberger@drake.edu';

        expectedCustomer = {
            customerId: expectedCustomerId,
            email: expectedCustomerEmail,
            firstName: expectedCustomerFirstName,
            lastName: expectedCustomerLastName
        };

        selectCustomers.mockReturnValue({
            rows: [{
                'customer_id': expectedCustomerId,
                'email': expectedCustomerEmail,
                'first_name': expectedCustomerFirstName,
                'last_name': expectedCustomerLastName
            }]
        });

        selectCustomerByCustomerId.mockReturnValue({
            rows: [{
                'customer_id': expectedCustomerId,
                'email': expectedCustomerEmail,
                'first_name': expectedCustomerFirstName,
                'last_name': expectedCustomerLastName
            }]
        });
    });

    it('should get all the customers', () => {
        const actualCustomers = getAllCustomers();

        expect(selectCustomers).toHaveBeenCalledTimes(1);

        expect(actualCustomers).toEqual([
            expectedCustomer
        ]);
    });

    it('should get a customer by a specific customerId', () => {
        const actualCustomer = getCustomerByCustomerId(expectedCustomerId);

        expect(selectCustomerByCustomerId).toHaveBeenCalledTimes(1);
        expect(selectCustomerByCustomerId).toHaveBeenCalledWith(expectedCustomerId);

        expect(actualCustomer).toEqual(expectedCustomer);
    });
});

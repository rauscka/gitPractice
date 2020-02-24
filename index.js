const Hapi = require('@hapi/hapi');
const uuid = require('uuid');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const menneID = uuid.v4();
    const customerMenne = {
        customerId: menneID,
        email: 'menne@menne.com',
        name: 'Menne',
        age: 20
    };

    const customerCole = {
        customerId: uuid.v4(),
        email: 'cole@cole.com',
        name: 'Cole',
        age: 85
    };

    const customerGreen = {
        customerId: uuid.v4(),
        name: 'Green',
        email: 'zach@green.com',
        age: 55
    };

    let customers = [customerMenne, customerCole, customerGreen];

    server.route({
        method: 'GET',
        path: '/customers',
        handler: (request, h) => {
            return customers;
        }
    });

    server.route({
        method: 'GET',
        path: '/customers/{email}',
        handler: (request, h) => {
            const {email} = request.params;
            const customer = customers.find((cust) => cust.email=== email);

            if (!customer) {
                return h.response().code(404);
            }

            return customer;
        }
    });

    server.route({
        method: 'POST',
        path: '/customers',
        handler: (request, h) => {
            const customer = request.payload;
            const existingCust = customers.find((cust) => cust.customerId === customer.customerId);

            if (existingCust) {
                return h.response(existingCust).code(303);
            } else {
                customers.push(customer);

                return h.response(customer).code(201);
            }

        }
    });
    server.route({
        method: 'DELETE',
        path: '/customers/{email}',
        handler: (request, h) => {
            const {email} = request.params;
            const customer = customers.find((cust) => cust.email === email);
            if (!customer) {
                return h.response().code(404);
            }

            let newCustomers = [];

            customers.forEach((cust) => {
                if (cust.email !== email) {
                    newCustomers.push(cust);
                }
            });

            customers = newCustomers;

            return '';
        }
    });

    server.route({
        method: 'PUT',
        path: '/customers/{customerId}',
        handler: (request, h) => {
            const {customerId} = request.params;
            const updatedCustomer = request.payload;

            if (customerId === menneID && updatedCustomer.age !== 20) {
                return h.response().code(422);
            }

            if (customerId !== updatedCustomer.customerId) {
                return h.response().code(409);
            }

            let newCustomers = [];

            customers.forEach((cust) => {
                if (cust.customerId === customerId) {
                    newCustomers.push(updatedCustomer);
                } else {
                    newCustomers.push(cust);
                }
            });

            customers = newCustomers;

            return '';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

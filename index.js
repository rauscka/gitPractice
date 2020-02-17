const item = {
    itemId: '02bbdbc7-e22e-4153-abd8-b5732a4ba6b5',
    name: 'Ball cap',
    description: 'Drake stuff',
    price: 19.99,
    size: 'Large'
};

const firstName = 'Karl';
const lastName = 'Rauschenberger';

const customer = {
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@drake.edu`,
    phoneNumber: '+15155555555'
};

const cart = {
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@drake.edu`,
    dateCreated: '02/16/2020',
    purchasedDate: '02/16/2020'

};

const cartItems = [{
    itemId: '02bbdbc7-e22e-4153-abd8-b5732a4ba6b5',
    itemName: 'Ball cap',
    description: 'Drake stuff',
    price: 19.99,
    size: 'Large'},{

    itemId: '02bbdbc7-e22e-4153-abd8-b5732a4ba6b5',
    itemName: 'Ball cap',
    description: 'Drake stuff',
    price: 19.99,
    size: 'Large'

}];

console.log('item', item);
console.log('customer', customer);
console.log('cart', cart);
console.log('cartItems', cartItems);

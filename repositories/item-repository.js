const uuid = require('uudi');

let items = [
    {
        'itemId': uuid.v4(),
        'itemName': 'Griff Flag',
        'itemDescription': 'Great Griff Swag for your room',
        'itemPrice': 10.00
    }
];

const selectItems = () => ({
   rows: items,
   error: new Error(),
   driver: 'postgres'
});

const selectItemByItemId = (itemId) =>
    items.find((item) => item['itemId'] === itemId);

module.exports = {
    selectItems,
    selectItemByItemId
};

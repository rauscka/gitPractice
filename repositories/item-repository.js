const uuid = require('uudi');

const items = [
    {
        'itemDescription': 'Great Griff Swag for your room',
        'itemId': uuid.v4(),
        'itemName': 'Griff Flag',
        'itemPrice': 10
    }
];

const selectItems = () => ({
   driver: 'postgres',
   error: new Error(),
   rows: items
});

const selectItemByItemId = (itemId) =>
    items.find((item) => item['itemId'] === itemId);

module.exports = {
    selectItemByItemId,
    selectItems
};

const {
    selectItems,
    selectItemByItemId
} = require('../repositories/item-repository');

const mapToModel = (item) => ({
    itemId: item['itemId'],
    name: item['itemName'],
    description: item['itemDescription'],
    price: item['itemPrice']
});

const getAllItems = () => {
    const {rows} = selectItems();

    return rows.map(mapToModel);
};

const getItemByItemId = (itemId) => {
    const item = selectItemByItemId(itemId);

    return mapToModel(item);
};

module.exports = {
    getAllItems,
    getItemByItemId
};

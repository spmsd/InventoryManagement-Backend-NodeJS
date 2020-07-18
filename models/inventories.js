const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose); // for currency
const Currency = mongoose.Types.Currency;

var inventorySchema = new Schema({  // schema for the inventory
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    expr_date: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    seller: {
        type: String,
        required: true      
    },
    categories :{
        type: String,
        required: true
    }
}, {
    timestamps: true //created at, updated at will be auto populated
});



var Inventories = mongoose.model('Inventory', inventorySchema); // creating model

module.exports = Inventories; // exporting this model to be used
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Categories  = mongoose.model('Category', categorySchema); // creating model

module.exports = Categories; // exporting this model to be used

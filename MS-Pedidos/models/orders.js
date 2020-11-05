const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    state: {type: String },
    price: {type: Number }
});

module.exports = mongoose.model('Order', logSchema);



const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const {String, Number} = mongoose.SchemaTypes

const productSchema = new Schema({
    _id: { type: String },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    ratings: { type: Number, required: true },
    image: { type: String, required: true }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
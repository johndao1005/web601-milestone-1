const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
        default: true,
    }
},{timestamp:true});

const Product = mongoose.model("Product", productSchema);
module.exports = Product
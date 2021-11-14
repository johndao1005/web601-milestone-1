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
    category: {
        type: Array,
        required: true
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
}, { timestamp: true });

// Using local storage instead of storing on MongoDB but might consider work on this again
// const cartSchema = new Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User',
//       },
//     cartItems: [
//         {
//             name: { type: String, required: true },
//             qty: { type: Number, required: true },
//             image: { type: String, required: true },
//             price: { type: Number, required: true },
//             product: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 required: true,
//                 ref: 'Product',
//             },
//         },
//     ],
//     subtotal: {
//         type: Number,
//         required: true
//     }
// })

// cartSchema.pre('save', async function (next) {
//     let total = 0
//     for (const quantity in this.products) {
//         const { price } = await Product.findOne({ name: quantity })
//         total += parseFloat(price) * parseInt(this.products[quantity])
//     }
//     this.subtotal = total
//     next()
// })

// const Cart = mongoose.model("Cart", cartSchema);


const Product = mongoose.model("Product", productSchema);
module.exports = Product
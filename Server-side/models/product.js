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
        type:Array,
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
},{timestamp:true});

const cartSchema = new Schema({
    email: {
        type: String,
        required: false
    },
    products: {
        type: Array,
        required: false
    },
    subtotal:{
        type: Number,
        required: true
    }
})

//creating method for cart to update subtotal after action
// cartSchema.methods.updateTotal =async function (userEmail){
        
//     const {products} = await Cart.findOne({
//             email:userEmail
//         })
//         let total = 0
//         for ( const quantity in products){
//             const {price} = await Product.findOne({name:item})
//             total += parseFloat(price)* parseInt(products[quantity])
//         }
//         await Cart.updateOne({email:userEmail},{$set:{subtotal:total}})
// }
cartSchema.pre('save',async function(next){
    let total = 0
    for ( const quantity in this.products){
        const {price} = await Product.findOne({name:quantity})
        total += parseFloat(price)* parseInt(this.products[quantity])
    }
    this.subtotal = total
    next()
})


const Cart = mongoose.model("Cart", cartSchema);
const Product = mongoose.model("Product", productSchema);
module.exports = {Product,Cart}
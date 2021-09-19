const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: false,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    DOB: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    pic:{
        type:String,
        required:true,
        default:""
    },
},{
        timestamp:true,//this will check when the user is created and updated
});

// start an action below before save, update user with pre('save',)
userSchema.pre('save',async function(next){
    //check password is modified before moving on to next callback
    if(!this.isModified('password')){
        next();
    }
    // bcrypt functionality to encrypt password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})


//decrypt the passworde
//.methods create a method for the Schema which can be used with any child using the schema
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const orderSchema = new mongoose.Schema({
    orderDate:{
        type: Date,
        default: Date.now,
        required: true
    },
    email: {
        type: String,
        required: true
    }
    ,
    products: Object
    // [{
    //     _id:false,
    //     id:{type: Schema.Types.name , ref:'Product'},
    //     quantity:{
    //         type:Number,
    //         default:1
    //     }
    // }]
    ,
    subtotal:{
        type: Number,
        required: true
    },
    state:{
        type:String,
        required: true
    }
},{timestamp:true})


const cartSchema = new Schema({
    email: {
        type: String,
        required: false
    },
    products: {
        type: Object,
        required: true
    },
    subtotal:{
        type: Number,
        required: true
    }
})


const Cart = mongoose.model("Cart", cartSchema);
const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);
module.exports = {User,Order,Cart}
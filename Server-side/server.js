//ANCHOR Preparation
// reading secrets key
require('dotenv').config();
// import modules
const express = require("express")
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const path = require("path");

// Api routes
const productRoutes = require("./routes/api/productRoutes");
const userRoutes = require("./routes/api/userRoutes");
const cartRoutes = require("./routes/api/cartRoutes");
const orderRoutes = require("./routes/api/orderRoutes");
const adminRoutes = require("./routes/api/adminRoutes")


//import middleware to handle error
const{notFound,errorHandler}= require("./middlewares/errorMiddleware")

// connect to MongoDB
const connectDB = require("./config/db")

//ANCHOR start the esstential
//connectDB() //connect to database with base log in

 // start an instance of the app
const app = express();


// setting up the view
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "pug");

// static contents
app.use("/static", express.static(path.join(__dirname + "/public")));


//session middleware
app.use(
    sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: parseInt(process.env.SESSION_TIME) },
    resave: false,
    })
);

// read json data and url code
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// Start middleware
app.use((req, res, next) => {
    console.log("Read request");
    if (req.session.userId != null) {
    console.log(req.session.userId);
    }
    next();
});

// Routes list
app.use("/product", productRoutes)
app.use("/cart", cartRoutes)
app.use("/", userRoutes)
app.use("/order", orderRoutes)
app.use("/admin", adminRoutes)

// call middleware to handle errorHandler
app.use(notFound),
app.use(errorHandler)


const PORT = process.env.PORT || 3000 // if reading .env file fail => running on port 3000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
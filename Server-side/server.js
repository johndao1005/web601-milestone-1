//ANCHOR Preparation
// reading secrets key
require('dotenv').config();
// import modules
const express = require("express")
const path = require("path");
const morgan = require("morgan")

// Api routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes")


//import middleware to handle error
const{notFound,errorHandler}= require("./middleware/errorMiddleware")

// connect to MongoDB
const connectDB = require("./config/db")

//ANCHOR start the essential
connectDB() //connect to database with base log in

const app = express();// start an instance of the app

// read json data and url code
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  

// Routes list
app.use("/product", productRoutes)
app.use("/cart", cartRoutes)
app.use("/user", userRoutes)
app.use("/order", orderRoutes)
app.use("/admin", adminRoutes)


app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   )
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....')
//   })
// }

// call middleware to handle errorHandler
app.use(notFound),
app.use(errorHandler)


const PORT = process.env.PORT || 3000 // if reading .env file fail => running on port 3000

app.listen(PORT, console.log( `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
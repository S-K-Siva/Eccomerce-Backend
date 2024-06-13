import express from "express";
import products from './routes/products/products.js';
import cart from './routes/cart/cart.js';
import profile from './routes/profile/profile.js';
import home from './routes/home/home.js';
import cors from "cors";
import "./utils/db.js";
import cookieParser from "cookie-parser";
import cookieJwtAuth from "./middlewares/cookieJWTtoken.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/',home);
app.use('/cart',cookieJwtAuth,cart);
app.use('/products',cookieJwtAuth,products);
app.use('/profile',cookieJwtAuth,profile);


const PORT = 3000;
app.listen(PORT,(req,res) => {
    console.log("The server is running on the port "+PORT);
})



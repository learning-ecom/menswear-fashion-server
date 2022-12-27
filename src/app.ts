import  express  from "express";
import http from "http";
import dotenv  from "dotenv";
import connectDB from "./db";
import bodyParser from "body-parser";
import cors from "cors"
import mongoose from "mongoose";
import UserRoute from "./router/user.router"
import ImgRoute from "./router/img.router"
import ProductRoute from "./router/product.router"

const app = express();
const server= http.createServer(app);


// dotenv
dotenv.config();

//BodyParser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// set mongoose as global
mongoose.Promise = global.Promise;

// domain
let domain ="*"
app.use(cors({origin:domain}))

// DB
connectDB()

// routes
app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/img", ImgRoute);
app.use("/api/v1/product", ProductRoute);

// Error Handler
app.use(function(err, req, res, next) {
    let error = "";
    if(err.error) {
        error += err.error.details.map(d => d.message).join(', ');
        error = error.replace(/"/g, "");
      } else {
        error = err.message;
      }
      res.status(500).send({ desc: error || err.desc, stack: err.stack, message: err.description || err.desc });
    
});
export default server;

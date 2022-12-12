import  express  from "express";
import http from "http";
import dotenv  from "dotenv";
import connectDB from "./db";


const app = express();
const server= http.createServer(app);


// dotenv
dotenv.config();



// DB
connectDB()
export default server;

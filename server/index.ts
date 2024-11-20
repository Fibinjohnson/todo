import express from 'express';
import BodyParser from 'body-parser';
import dotenv from 'dotenv';
import logger from 'morgan'
dotenv.config();
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import  cors from 'cors';
import cookieParser from "cookie-parser";
import {connectToDb} from './connection/connection'
const app =express();
import http from 'http';
const server=http.createServer(app)
import {register} from './controller/Auth'
import auth from './routes/auth'
import postRoutes from './routes/postRoutes'

app.use(cors({  origin: "*",
     credentials:true}))
app.use(cookieParser())
app.use(logger("dev"));
app.use(express.json());
app.use(BodyParser.json({ limit:"30mb"}))
app.use(morgan("common"))
app.use(helmet.crossOriginResourcePolicy({
    policy:"cross-origin"
}));
app.use(BodyParser.urlencoded({limit:"30mb", extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/api/auth/register',register)
app.use('/api/auth',auth)
app.use('/api/post',postRoutes)

connectToDb().then(()=>{console.log("connection successfull")

    server.listen(3001,async()=>{
     
      console.log("app is listening at port 3001")})
    
   }).catch((error)=>{
    console.log('connection ERROR',error)
   })
export default app;

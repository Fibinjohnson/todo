const express=require('express')
const BodyParser=require('body-parser');
require("dotenv").config();
const helmet=require("helmet");
const morgan=require("morgan");
const path=require("path");
const cors=require('cors');
const cookieParser=require("cookie-parser");
const {connectToDb} =require('./connection/connection')
const app =express();
const http=require('http');
const server=http.createServer(app)
const {register}=require('./controller/Auth')
const auth=require('./routes/auth')
const postRoutes=require('./routes/postRoutes')

app.use(cors({  origin: 'https://main--profound-sopapillas-939c26.netlify.app',
     credentials:true}))
app.use(cookieParser())
app.use(express.json());
app.use(BodyParser.json({ limit:"30mb",extended:true}))
app.use(morgan("common"))
app.use(helmet.crossOriginResourcePolicy({
    policy:"cross-origin"
}));
app.use(BodyParser.urlencoded({limit:"30mb", extended: true }));


app.post('/auth/register',register)
app.use('/auth',auth)
app.use('/post',postRoutes)

connectToDb().then(()=>{console.log("connection successfull")

    server.listen(3001||process.env.PORT,async()=>{
     
      console.log("app is listening at port 3001")})
    
   }).catch((error)=>{
    console.log('connection ERROR',error)
   })
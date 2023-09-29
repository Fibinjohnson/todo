import {verify} from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
interface CustomRequest extends Request {
  user?: any; //
}
const  verifyToken = async (req:CustomRequest, res:Response, next:NextFunction) => {
  try {
    let token = req.header("Authorization");
     
    if (!token) {
      
      return res.status(403).send("Access Denied");
     
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    
    }
    const secretKey = process.env.SECRETCODEJWT;

    if (!secretKey) {
      console.error('JWT secret key is not defined.');
      process.exit(1);
    }
    const verified = verify(token, secretKey);
    req.user = verified;
    
    next();
  } catch (err:any) {
    res.status(500).json({ Tokenerror: err.message });
  }
};
export  {verifyToken};
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const authConfig = require("../config/auth.json");

interface IPayload {
  sub: string;
}

export function Auth(req: Request, res: Response, next: NextFunction) {
  
  const authHeader = req.headers.authorization;
  
  // Se não tiver enviado token
  if (!authHeader) {
    return res.status(401).send({ error: "No token provided"});
  }
  
  // Dividindo o token em duas partes
  const [, token] = authHeader.split(" ");
  
  // Se o token enviado não bate com a nossa condificação
  try {
    const { sub } = verify(token, authConfig.secret) as IPayload
  
    req.userId = sub;
    
    return next();
  
  } catch (err) {
  
    return res.status(401).send({error: "Token invalid"});
  }
}
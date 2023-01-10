import {NextFunction, Request, Response} from "express";

export function ResponseHeaderSetter (req: Request, res: Response, next: NextFunction){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.setHeader('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials','true');
    next();
}
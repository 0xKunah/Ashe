import { NextFunction, Request, Response } from 'express';
import Crypto from './Crypto';
export default class Middleware
{
    // API Auth middleware
    // Filter all request, allow only the ones with a good x-ashe-auth header
    static auth(req: Request, res: Response, next: NextFunction)
    {
        if(!req.headers['x-ashe-auth']) return res.status(403).json({code: "Forbidden", message: "You're not allowed to access this content"})
        if(Crypto.isAuthKey(req.headers['x-ashe-auth']!.toString())) next()
        else res.status(403).json({code: "Forbidden", message: "You're not allowed to access this content"})
    }
}
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import config from '../Configuration/config';



@Injectable()
export class AuthMiddleware implements NestMiddleware {

    
    use(req: Request, res: Response, next: NextFunction) {
        
        const auth = config.security.authentication.apiCredentials;
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    
        
        if (username && password && username === auth.username && password === auth.password) {
            return next();
        }
        
        throw new UnauthorizedException('Invalid API Credentials.');

    }


}
import { Injectable, CanActivate } from '@nestjs/common';
import config from '../../Configuration/config';



@Injectable()
export class SocketGuard implements CanActivate {

  
    constructor () {}


    canActivate (context: any): boolean | any {

        let auth = config.security.authentication.apiCredentials;
        const b64auth = context.args[0].handshake.headers.authorization.split(' ')[1];
        const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
        
        if (username && password && username === auth.username && password === auth.password) {
            return true
        }
        
        return false;

    }


}
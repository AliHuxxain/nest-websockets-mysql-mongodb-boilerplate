import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUserDTO } from "../dto/authUser.dto";
import config from '../../Configuration/config';



@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy, 'JWT') {


    constructor () {
        
        super ({
            jwtFromRequest: ExtractJwt.fromHeader('access-token'),
            ignoreExpiration: false,
            secretOrKey: config.security.authentication.jwt.secret
        });

    }
    
      
    async validate (payload: AuthUserDTO) {
        return payload;
    }


}
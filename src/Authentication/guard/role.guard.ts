import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_ROLE_KEY } from '../../Utilities/Decorators/role.decorator';
import { AuthUserDTO } from '../dto/authUser.dto';


@Injectable()
export class RolesGuard implements CanActivate {


    constructor(private reflector: Reflector) {}

    
    canActivate(context: ExecutionContext): boolean {

        const roles = this.reflector.get<string[]>(IS_ROLE_KEY, context.getHandler());
        if (!roles) return true;

        const request = context.switchToHttp().getRequest();
        const user: AuthUserDTO = request.user;
        
        return roles.includes(user.type);
        
    }


}
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../Utilities/Decorators/public.decorator';



@Injectable()
export class JwtAuthGuard extends AuthGuard('JWT') {


    constructor (private reflector: Reflector) {
        super();
    }
    
      
    canActivate (context: ExecutionContext) {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;
        
        return super.canActivate(context);
        
    }


}
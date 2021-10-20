import { SetMetadata } from '@nestjs/common';


export const IS_ROLE_KEY = 'roles';
export const Roles = (...Roles: string[]) => SetMetadata(IS_ROLE_KEY, Roles);
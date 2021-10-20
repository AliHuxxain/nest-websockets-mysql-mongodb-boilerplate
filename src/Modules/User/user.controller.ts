import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from 'src/Utilities/Decorators/role.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';



@Controller('users')
export class UserController {


    constructor (private readonly userService: UserService) {}

    
    @Get(':id')
    @Roles('admin')
    findOne (@Param('id') id): Promise<User> {
        return this.userService.findOne(id);
    }


    // @Get()
    // findAll (): Promise<User[]> {
    //     return this.userService.findAll();
    // }


}

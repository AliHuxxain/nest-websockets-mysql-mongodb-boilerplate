import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';



@Controller('users')
export class UserController {


    constructor (private readonly userService: UserService) {}

    
    // @Get(':id')
    // findOne (@Param('id') id): Promise<User> {
    //     return this.userService.findOne(id);
    // }


    // @Get()
    // findAll (): Promise<User[]> {
    //     return this.userService.findAll();
    // }


}

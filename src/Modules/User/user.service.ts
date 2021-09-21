import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginRequestDTO } from 'src/Authentication/dto/login.request.dto';
import { LoginDataDTO } from 'src/Authentication/dto/login.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';



@Injectable()
export class UserService {


    constructor (@InjectRepository(User) private userRepository: Repository<User>) {}


    // async findOne (id: number): Promise<User> {
    //     return await this.userRepository.findOne(id);
    // }


    // async findAll (): Promise<User[]> {
    //     return await this.userRepository.find();
    // }


    async login (data: LoginRequestDTO): Promise<any> {

        let { email, password } = data;
        // let password = md5(salt + password);  TODO

        let userData = await this.userRepository.findOne({ where: { email, password } });

        if (userData) {
            
            let loginData: LoginDataDTO = new LoginDataDTO();
            loginData.userId = userData.userId;
            loginData.contact = userData.contact;
            loginData.email = userData.email;
            loginData.name = `${userData.firstName} ${userData.lastName}`;

            return loginData;


        } else {

            return { error:'Invalid Credentials.' };
            
        }

    }


}
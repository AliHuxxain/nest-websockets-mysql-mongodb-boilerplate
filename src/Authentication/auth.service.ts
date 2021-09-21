import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/Modules/User/user.service';
import { Repository } from 'typeorm';
import { LoginRequestDTO } from './dto/login.request.dto';
import { LoginResponseDTO } from './dto/login.response.dto';
import { RefreshToken } from './refreshToken.entity';
import { v4 as uuidv4 } from 'uuid';
import { RefreshTokenRequestDTO } from './dto/refreshToken.request.dto';
import { RefreshTokenResponseDTO } from './dto/refreshToken.response.dto';
import { AuthUserDTO } from './dto/authUser.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import config from '../Configuration/config';
import * as dateFormat from 'dateformat';



@Injectable()
export class AuthService {


    constructor (@InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>, private jwtService: JwtService, private userService: UserService) {}


    private async generateTokens (payload: AuthUserDTO) {

        let { id } = payload;
        let accessToken = this.jwtService.sign(classToPlain(payload));
        
        let refreshToken = uuidv4();
        let expiredAt = new Date();
        expiredAt.setDate(expiredAt.getDate() + config.security.authentication.refreshToken.expiresIn);


        let tokenExist = await this.refreshTokenRepository.findOne({ where: { userId:id } });

        if (tokenExist) {

            tokenExist.token = refreshToken;
            tokenExist.data = JSON.stringify(payload);
            tokenExist.expiredAt = dateFormat(expiredAt, "yyyy-mm-dd HH:MM:ss");
            tokenExist.createdAt = dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");
            
            await this.refreshTokenRepository.save(tokenExist);

        } else {

            let newToken = new RefreshToken();
            newToken.userId = id;
            newToken.data = JSON.stringify(payload);
            newToken.token = refreshToken;
            newToken.expiredAt = dateFormat(expiredAt, "yyyy-mm-dd HH:MM:ss");;

            await this.refreshTokenRepository.save(newToken);

        }

        return { accessToken, refreshToken };

    }


    async login (data: LoginRequestDTO): Promise<LoginResponseDTO> {

        let doctorData = await this.userService.login(data);

        if (doctorData.error) throw new HttpException({ statusCode:200, error:doctorData.error }, HttpStatus.OK);

        let { userId, name, email, contact } = doctorData;
        let payload = new AuthUserDTO();
        payload.id = userId;
        payload.email = email;
        payload.name = name;

        let { accessToken, refreshToken } = await this.generateTokens(payload);

        return <LoginResponseDTO>{ data: doctorData, accessToken, refreshToken };
        
    }


    async refreshToken (data: RefreshTokenRequestDTO): Promise<RefreshTokenResponseDTO> {

        let tokenData = await this.refreshTokenRepository.findOne({ where: { token:data.refreshToken } });

        if (!tokenData) throw new UnauthorizedException('Invalid Refresh Token.');

        let { accessToken, refreshToken } = await this.generateTokens(plainToClass(AuthUserDTO, JSON.parse(tokenData.data)));

        return <RefreshTokenResponseDTO>{ accessToken, refreshToken };

    }


}
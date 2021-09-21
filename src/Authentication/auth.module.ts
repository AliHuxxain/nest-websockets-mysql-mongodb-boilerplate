import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserService } from 'src/Modules/User/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Modules/User/user.entity';
import { RefreshToken } from './refreshToken.entity';


import config from '../Configuration/config';
const { secret, expiresIn } = config.security.authentication.jwt;



@Module({
    imports: [
        PassportModule,
        JwtModule.register({ secret, signOptions: { expiresIn } }),
        TypeOrmModule.forFeature([User, RefreshToken])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, JwtStrategy]
})



export class AuthModule {}
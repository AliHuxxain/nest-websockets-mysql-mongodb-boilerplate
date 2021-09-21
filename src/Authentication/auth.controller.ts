import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { Public } from '../Utilities/Metadata/publicRoute.util';
import { AuthService } from "./auth.service";
import { LoginRequestDTO } from './dto/login.request.dto';
import { LoginResponseDTO } from "./dto/login.response.dto";
import { RefreshTokenRequestDTO } from "./dto/refreshToken.request.dto";
import { RefreshTokenResponseDTO } from "./dto/refreshToken.response.dto";



@Controller('auth')
export class AuthController {


    constructor(private authService: AuthService) {}


    @Public()
    @HttpCode(200)
    @Post('login')
    async login (@Body() data: LoginRequestDTO): Promise<LoginResponseDTO> {

        return await this.authService.login(data);

    }


    @Public()
    @HttpCode(200)
    @Post('refreshToken')
    async refreshToken (@Body() data: RefreshTokenRequestDTO): Promise<RefreshTokenResponseDTO> {

        return await this.authService.refreshToken(data);

    }


}
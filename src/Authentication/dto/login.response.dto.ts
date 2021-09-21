import { LoginDataDTO } from './login.dto';



export class LoginResponseDTO {


    data: LoginDataDTO

    accessToken: string

    refreshToken: string

    
}
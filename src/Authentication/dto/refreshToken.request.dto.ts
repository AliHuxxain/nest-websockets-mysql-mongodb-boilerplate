import { IsNotEmpty } from "class-validator";



export class RefreshTokenRequestDTO {


    @IsNotEmpty({ message: 'Refresh Token should not be empty.' })
    refreshToken: string;

    
}
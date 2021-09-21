import { IsEmail, IsNotEmpty } from 'class-validator';



export class LoginRequestDTO {


    @IsEmail({}, { message: 'Please enter a valid Email.' })
    email: string;


    @IsNotEmpty({ message: 'Password should not be empty.' })
    password: string;
    
    
}
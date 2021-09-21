import { Exclude, Expose } from 'class-transformer';



@Exclude()
export class AuthUserDTO {


    @Expose()
    id: number;
    
    @Expose()
    name: string;
    
    @Expose()
    email: string;

    @Expose()
    contact: string;

    @Expose()
    type: string;

    @Expose()
    auth: number;

    
}
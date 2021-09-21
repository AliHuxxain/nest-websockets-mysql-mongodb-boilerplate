import { Exclude, Expose } from 'class-transformer';


@Exclude()
export class DisplayUserDTO {


    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string

    
}
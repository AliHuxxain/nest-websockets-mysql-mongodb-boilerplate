import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name:'users' })
export class User {

    
    @PrimaryGeneratedColumn({ name:'user_id' })
    userId: number;


    @Column({ name:'first_name' })
    firstName: string;


    @Column({ name:'last_name' })
    lastName: string;


    @Column()
    email: string;


    @Column()
    password: string;


    @Column()
    contact: string;


}
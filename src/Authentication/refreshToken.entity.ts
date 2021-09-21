import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as dateFormat from 'dateformat';



@Entity({ name:'refresh_tokens' })
export class RefreshToken {

    
    @PrimaryGeneratedColumn()
    id: number;


    @Column({ name:'user_id' })
    userId: number;


    @Column()
    token: string;


    @Column()
    data: string;

    
    @Column({ name:'created_at', default: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss") })
    createdAt: Date;

    
    @Column({ name:'expired_at', default: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss") })
    expiredAt: Date;


}
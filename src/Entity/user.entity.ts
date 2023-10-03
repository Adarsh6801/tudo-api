import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from "./todo.entity";

@Entity({name:'users'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;

    @Column()
    salt:string;

    @OneToMany(()=>TodoEntity, (todo)=>todo.user)
    todo:TodoEntity


}
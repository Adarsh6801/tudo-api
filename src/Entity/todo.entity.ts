import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity({name:'todos'})
export class TodoEntity{
    save() {
        throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    description:string;
    @Column()
    status:TodoStatus

    @ManyToOne(()=>UserEntity, (user)=>user.todo)
    user:UserEntity

    @Column()
    userId:number
}

export enum TodoStatus{
    OPEN='OPEN',
    WIP='WIP',
    COMPLETED='COMPLETED'
}
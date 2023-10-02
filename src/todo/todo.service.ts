import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/Entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(TodoEntity) private readonly repo: Repository<TodoEntity>){}
    
   async getAllTudos(){
        return await this.repo.find()
    }
}

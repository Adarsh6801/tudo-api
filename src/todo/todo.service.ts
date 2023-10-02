import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { todo } from 'node:test';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(TodoEntity) private readonly repo: Repository<TodoEntity>){}

   async getAllTodos(){
        return await this.repo.find()
    }

    async createTodo(CreateTodoDto:CreateTodoDto){
        const todo:TodoEntity= new TodoEntity();
        const{ title, description }= CreateTodoDto
        todo.title=title;
        todo.description=description;
        todo.status=TodoStatus.OPEN;
        
        this.repo.create(todo);
       return await this.repo.save(todo)
    }
}

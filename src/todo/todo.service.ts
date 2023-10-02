import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { todo } from 'node:test';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(TodoEntity) private readonly repo: Repository<TodoEntity>){}

    // get all todos  function 
   async getAllTodos(){
    try{
        return await this.repo.find()
    }catch(error){
        throw new InternalServerErrorException('Something went wrong')
    }
    }

    // function fot creating the todo 
    async createTodo(CreateTodoDto:CreateTodoDto){

        try{
            const todo:TodoEntity= new TodoEntity();
            const{ title, description }= CreateTodoDto
            todo.title=title;
            todo.description=description;
            todo.status=TodoStatus.OPEN;
            
            this.repo.create(todo);
           return await this.repo.save(todo)
        }catch(error){
            throw new InternalServerErrorException('Something went wrong')
        }
    }

    // function for update the todo 
    async update(id:number, status:TodoStatus){
        try{
            await this.repo.update({id}, {status});
            return this.repo.findOne({ where: { id } });
        }catch(error){
            throw new InternalServerErrorException('Something went wrong')

        }

    }

    // function for delete the todo 
    async delete(id:number){
        try{
            return await this.repo.delete(id)
        }catch(error){
            throw new InternalServerErrorException('Something went wrong')
        }
    }
}

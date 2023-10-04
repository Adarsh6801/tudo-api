import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { todo } from 'node:test';
import { NotFoundError } from 'rxjs';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(TodoEntity) private readonly repo: Repository<TodoEntity>){}

    // get all todos  function 
   async getAllTodos(user:UserEntity){
    
        const query= await this.repo.createQueryBuilder('todo')
        query.where(`todo.userId = :userId`,{userId:user.id})
        try{
           return await query.getMany()
        }catch(error){
            throw new NotFoundException('No todo found')
    }
    }

    // function fot creating the todo 
    async createTodo(CreateTodoDto:CreateTodoDto, user:UserEntity){

        try{
            const todo:TodoEntity= new TodoEntity();
            const{ title, description }= CreateTodoDto
            todo.title=title;
            todo.description=description;
            todo.status=TodoStatus.OPEN;
            todo.userId=user.id
            this.repo.create(todo);
           return await this.repo.save(todo)
        }catch(error){
            throw new InternalServerErrorException('Something went wrong')
        }
    }

    // function for update the todo 
    async update(id: number, status: TodoStatus, user: UserEntity) {
        try {
            console.log(status,'status');
            
          await this.repo.update({id, userId: user.id}, {status});
          return this.repo.findOne({where:{id}});
        } catch (err) {
          throw new InternalServerErrorException('Something went wrong');
        }
    
      }

    // function for delete the todo 
    async delete(id:number, user:UserEntity){

        const result= await this.repo.delete({id,userId:user.id})

        if(result.affected===0){
            throw new NotFoundException('Todo not deleted')
        }else{
            return {success:true}
        }
    }
}

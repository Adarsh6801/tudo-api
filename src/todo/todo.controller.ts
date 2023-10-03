import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common'; // Import ValidationPipe
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';
import { TodoStatus } from 'src/Entity/todo.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/Entity/user.entity';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
    constructor(private todoService: TodoService) {}

    // get all todo 
    @Get()
    getAllTodos(
        @User() user: UserEntity
    ) {
        return this.todoService.getAllTodos(user);
    }

    // for creating new todo 
    @Post()
    createNewTodo(@Body(new ValidationPipe()) data: CreateTodoDto,  @User() user: UserEntity) {
       return this.todoService.createTodo(data, user);
    }

    // updating the todos 
    @Patch(':id')
    updateTodo(
        @Body('status',TodoStatusValidationPipe) status: TodoStatus,
        @Param('id') id:number, @User() user: UserEntity
    ){
       return this.todoService.update(id, status, user);
    }

    // delete todo 
    @Delete(':id')
    deleteTodo(@Param('id') id:number, @User() user: UserEntity){
        return this.todoService.delete(id, user)
    }
}

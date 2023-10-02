import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common'; // Import ValidationPipe
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';
import { TodoStatus } from 'src/Entity/todo.entity';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    // get all todo 
    @Get()
    getAllTodos() {
        return this.todoService.getAllTodos();
    }

    // for creating new todo 
    @Post()
    createNewTodo(@Body(new ValidationPipe()) data: CreateTodoDto) {
       return this.todoService.createTodo(data);
    }

    // updating the todos 
    @Patch(':id')
    updateTodo(
        @Body('status',TodoStatusValidationPipe) status: TodoStatus,
        @Param('id') id:number
    ){
       return this.todoService.update(id,status);
    }

    // delete todo 
    @Delete(':id')
    deleteTodo(@Param('id') id:number){
        return this.todoService.delete(id)
    }
}

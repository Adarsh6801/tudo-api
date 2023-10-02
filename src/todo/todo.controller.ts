import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common'; // Import ValidationPipe
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';

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
}

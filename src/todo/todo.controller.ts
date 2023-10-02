import { Body, Controller, Get, Post, } from '@nestjs/common';
import { TodoService } from './todo.service';
@Controller('todo')


export class TodoController {
    constructor(private tudoService:TodoService) {}
    // get all todo 
    @Get()
    getAllTodos(){
        return this.tudoService.getAllTodos()
    }
    // for creating new todo 
    @Post()
    createNewTodo(@Body() data){
        const {title, description}=data;
       return this.tudoService.createTodo(title, description)
    }

}

import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
@Controller('todo')


export class TodoController {
    constructor(private tudoService:TodoService) {}
    @Get()
    getAllTodos(){
        return this.tudoService.getAllTodos()
    }
}

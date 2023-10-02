import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
@Controller('todo')


export class TodoController {
    constructor(private tudoService:TodoService) {}
    @Get()
    getAllTudos(){
        return this.tudoService.getAllTudos()
    }
}

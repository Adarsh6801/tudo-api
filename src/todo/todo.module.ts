import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from 'typeorm';
import { TodoEntity } from 'src/Entity/todo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([TodoEntity]),
    AuthModule
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}

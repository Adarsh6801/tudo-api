import { IsNotEmpty, Length } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    @Length(1, 15, { message: 'Max Length is 5 characters' })
    title: string;

    @IsNotEmpty()
    description: string;
}

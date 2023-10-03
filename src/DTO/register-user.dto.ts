import { IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(14)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "Password is too weak, choose a stronger password between 6 and 14 characters"
      })
    password: string;
}

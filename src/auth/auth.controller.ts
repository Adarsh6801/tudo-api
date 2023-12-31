import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/DTO/register-user.dto';
import { LoginUserDTO } from 'src/DTO/login-user.dto';

@Controller('auth')
export class AuthController {

constructor(private readonly authService: AuthService){}

    // for registration 
    @Post('register')
    registration(@Body(new ValidationPipe()) regDTO:RegisterUserDto){
       return this.authService.registerUser(regDTO)
    }

    // for login 
    @Post('login')
  signin(@Body(ValidationPipe) loginDTO: LoginUserDTO) {    
    return this.authService.loginUser(loginDTO);
  }
}

import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/register-user.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { LoginUserDTO } from 'src/DTO/login-user.dto';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>, 
    private jwt:JwtService
    ) {}

    // function for registering a user 
    async registerUser(RegisterUserDto: RegisterUserDto) {
        const { username, password } = RegisterUserDto;
        const salt = await bcrypt.genSalt(12); // Generate a salt with a cost factor of 12
        const hashed = await bcrypt.hash(password, salt); // Use the generated salt to hash the password
        console.log(hashed);
        const user:UserEntity= new UserEntity()
        user.username=username;
        user.password=hashed;
        user.salt=salt;

        this.repo.create(user)
        try{
            return await this.repo.save(user)
        }catch(error){
            throw new InternalServerErrorException('something went wrong, user was not created.')
        }
    }

    // function for the login user 
    async loginUser(LoginUserDTO:LoginUserDTO){
        const {username, password}=LoginUserDTO;

        const user = await this.repo.findOne({ where: { username } });
        if(!user){
            throw new UnauthorizedException('Invalid user name')
        }
        const salt=user.salt;
        const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(isPasswordMatch){
            const jwtPayload={username}
            const jwtToken= await this.jwt.signAsync(jwtPayload)
            return jwtToken
        }else{
            throw new UnauthorizedException('Invalid Password.')
        }
    }
}

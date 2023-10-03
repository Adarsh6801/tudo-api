import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { JwtCustomStrategy } from './jwt-custom.strategy';
dotenv.config();
@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret:process.env.JWT_SECRET_KEY,
      signOptions:{
        algorithm:'HS512',
        expiresIn:'1d'
      }
    }),
    PassportModule.register({
      defaultStrategy:'jwt',
    })
  ],
  providers: [AuthService, JwtCustomStrategy],
  controllers: [AuthController],
  exports:[PassportModule, JwtCustomStrategy]
})
export class AuthModule {}

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { jwtSecret } from 'src/authorization/secret'
import { AuthController } from '../controllers/AuthController'
import { UserController } from '../controllers/UserController'
import { UserEntity } from '../entitties/UserEntity'
import { AuthService } from '../services/AuthService'
import { UserService } from '../services/UserService'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({ global: true, secret: jwtSecret.secret, signOptions: { expiresIn: '7d' } })],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
})
export class UserModule {}

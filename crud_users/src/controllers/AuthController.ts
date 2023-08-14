import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { SignInDto } from 'src/classes/SignInDto'
import { JoiValidationPipe } from 'src/pipes/JoiValidationPipe'
import { LoginSchema } from 'src/schemas/LoginSchema'
import { AuthService } from '../services/AuthService'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body(new JoiValidationPipe(LoginSchema.login)) SignInDto: SignInDto) {
    const user = this.authService.signIn(SignInDto.email, SignInDto.password)
    return user
  }
}

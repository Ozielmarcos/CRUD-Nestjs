import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/services/UserService'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findOne({ email })
    const equalPassword = this.userService.hashPasswordCompare(password, user.password)

    if (!equalPassword) {
      throw new UnauthorizedException()
    }

    const payload = { username: user.email }
    return { access_token: await this.jwtService.signAsync(payload) }
  }
}

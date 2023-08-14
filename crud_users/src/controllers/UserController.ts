import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/authorization/AuthGuard'
import { UserDto } from '../classes/UserDto'
import { JoiValidationPipe } from '../pipes/JoiValidationPipe'
import { UserSchema } from '../schemas/UserSchema'
import { UserService } from '../services/UserService'

@UseGuards(AuthGuard)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body(new JoiValidationPipe(UserSchema.userCreate)) userDto: UserDto) {
    this.userService.createUser(userDto)
    return 'Usuario criado com sucesso '
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne({ id })
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UserDto) {
    this.userService.update(Number(id), user)
    return 'Atualizado com sucesso!'
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.userService.remove(id)
    return 'Usuário deletado'
  }
}

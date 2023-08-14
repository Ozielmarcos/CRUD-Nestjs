import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { FindOptionsWhere, Repository } from 'typeorm'
import { UserDto } from '../classes/UserDto'
import { UserEntity } from '../entitties/UserEntity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserDto) {
    const userEntity = new UserEntity(user.id, user.email, this.hashPassword(user.password))

    await this.userRepository.save(userEntity)
  }

  async findAll() {
    const userEntity = await this.userRepository.find()
    return userEntity.map((user) => {
      return new UserDto(user.id, user.email, user.password)
    })
  }

  async findOne(userEntity: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: userEntity,
      select: ['id', 'email'],
    })
    if (user) return user
    else throw new NotFoundException('Usuário não encontrado')
  }

  async update(id: number, userDto: Partial<UserDto>) {
    const userEntity = await this.findOne({ id })

    await userEntity.set(userDto.email, userDto.password ? this.hashPassword(userDto.password) : undefined)
    this.userRepository.save(userEntity)
  }

  async remove(id: number) {
    this.findOne({ id })
    await this.userRepository.delete({ id })
  }

  private hashPassword(password: string) {
    const saltOrRounds = 10
    const hash = bcrypt.hashSync(password, saltOrRounds)
    return hash
  }

  hashPasswordCompare(password: string, hash: string) {
    return bcrypt.compareSync(password, hash)
  }
}

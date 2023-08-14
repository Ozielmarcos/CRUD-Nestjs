import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'email', type: 'character varying' })
  email: string

  @Column({ name: 'password', type: 'character varying' })
  password: string

  set(email?: string, password?: string) {
    if (email) this.email = email
    if (password) this.password = password
  }

  constructor(id: number, email: string, password: string) {
    this.id = id
    this.email = email
    this.password = password
  }
}

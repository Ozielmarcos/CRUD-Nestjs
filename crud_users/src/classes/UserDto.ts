export class UserDto {
  id: number
  email: string
  password: string
  constructor(id: number, email: string, password: string) {
    this.id = id
    this.email = email
    this.password = password
  }
  set(email?: string, password?: string): void {
    if (email) this.email = email
    if (password) this.password = password
  }
}

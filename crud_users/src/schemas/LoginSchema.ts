import * as Joi from 'joi'
import { GenericSchema } from './GenericSchema'

export class LoginSchema {
  static login = Joi.object({
    email: GenericSchema.email,
    password: GenericSchema.password,
  })
}

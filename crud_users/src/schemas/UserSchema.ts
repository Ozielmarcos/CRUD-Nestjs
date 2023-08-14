import * as Joi from 'joi'

export class UserSchema {
  // "static" sempre vai existtir se precisar usar 'new'
  static userObject = {
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required().pattern(new RegExp('^[a-zA-Z0-9]*$')),
  }

  static userCreate = Joi.object({
    ...this.userObject,
  })

  static userUpdate = Joi.object({
    email: this.userObject.email,
    password: this.userObject.password,
  })
}

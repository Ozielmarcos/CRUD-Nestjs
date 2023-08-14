import * as Joi from 'joi'

export class GenericSchema {
  static email = Joi.string().email().required()
  static password = Joi.string().min(4).max(20).required().pattern(new RegExp('^[a-zA-Z0-9]*$'))
}

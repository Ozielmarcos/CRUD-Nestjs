import Joi, { ValidationErrorItem } from 'joi'

export function joiErrorHandler(error: ValidationErrorItem) {
  switch (error.type) {
    case 'string.min':
    case 'number.min':
      return `Parâmetro de ${error.context?.label} devem ser maior ou igual a ${error.context?.limit}`
    case 'string.max':
    case 'number.max':
      return `Parâmetro ${error.context?.label} deve ser menor ou igual a ${error.context?.limit}`
    case 'any.required':
      return `Parâmetro ${error.context?.label} não pode ser vazio`
    case 'number.base':
      return `Parâmetro ${error.context?.label} deve ser numérico`
    case 'string.pattern.base':
      return `Parâmetro ${error.context?.label} devem respeitar o padrão`
    case 'number.unsafe':
      return `Parâmetro ${error.context?.label} deve ser menor`
    case 'any.custom':
      return `Parâmetro ${error.context?.label} deve estar formatado corretamente`
    default:
      return 'Erro desconhecido'
  }
}

export function joiValidationErrorHandler(validationError: Joi.ValidationError) {
  return validationError.details.map((errorItem) => joiErrorHandler(errorItem)).join(', ')
}

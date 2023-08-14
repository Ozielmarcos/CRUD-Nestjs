import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ObjectSchema } from 'joi'
import { joiValidationErrorHandler } from 'src/helpers/helperJoi'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { abortEarly: false })

    if (error) {
      throw new BadRequestException(joiValidationErrorHandler(error))
    }
    return value
  }
}

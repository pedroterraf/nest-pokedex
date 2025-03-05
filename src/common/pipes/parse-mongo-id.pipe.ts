import { ArgumentMetadata, BadGatewayException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform { // Los Pipes transforman la data

  transform(value: string, metadata: ArgumentMetadata) {
    // console.log({value, metadata});
    
    if (!isValidObjectId(value)) {
       throw new BadGatewayException(`${value} is not a valid MongoID`)
    }

    return value.toUpperCase();
  }

}

import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  HttpSuccess<T>(statusCode: number, message: string, data: T) {
    return {
      statusCode,
      message,
      data,
    };
  }
}

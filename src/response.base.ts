import { Res, HttpStatus, Response } from '@nestjs/common';

export class BaseResponse {
  static ok(@Res() res, data: object[] | object, message = ''): Response {
    return res.status(HttpStatus.OK).json({
      success: true,
      message,
      results: data,
    });
  }

  static badResponse(
    @Res() res,
    data: object[] | object,
    message = '',
  ): Response {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message,
      errors: data,
    });
  }
}

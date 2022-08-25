import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default abstract class Middlewares {
  public static errorMiddleware(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response {
    const { name } = err;
    const myErrorObjectName = 'errorObject';

    if (name === myErrorObjectName) {
      const { code, message: myMessage } = JSON.parse(err.message);

      return res.status(code).json({ message: myMessage, error: true });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message, error: true });
  }
}

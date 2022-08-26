import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import decodToken from '../helpers/decodToken';
import throwMyErrorObject from '../helpers/throwMyErrorObject';

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

  public static authentication(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    const token = req.headers.authorization;

    if (!token) return throwMyErrorObject(StatusCodes.UNAUTHORIZED, 'Token not found');

    const decod = decodToken(token);
    const { data: userToken } = decod as { data: UserToken };

    req.userToken = userToken;

    return next();
  }
}

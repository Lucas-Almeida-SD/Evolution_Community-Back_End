import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import { IUserDTO } from '../interfaces/User.interface';
import throwMyErrorObject from './throwMyErrorObject';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (token: string): { data: IUserDTO } | void => {
  try {
    const decod = jwt.verify(token, JWT_SECRET);

    return decod as { data: IUserDTO };
  } catch (err) {
    return throwMyErrorObject(StatusCodes.UNAUTHORIZED, 'Expired or invalid token');
  }
};

import jwt, { SignOptions } from 'jsonwebtoken';
import 'dotenv/config';
import { IUserDTO } from '../interfaces/User.interface';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (user: IUserDTO): string => {
  const jwtConfig: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };

  const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);

  return token;
};

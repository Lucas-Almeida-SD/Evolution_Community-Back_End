import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/User.service';

export default class UserController {
  constructor(private service: UserService) {}

  public create = async (req: Request, res: Response): Promise<void> => {
    const user = req.body;

    await this.service.create(user);

    res.status(StatusCodes.CREATED).json({ message: 'Created', error: false });
  };
}

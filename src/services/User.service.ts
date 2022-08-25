import { IUserDTO } from '../interfaces/User.interface';
import UserModel from '../models/User.model';

export default class UserService {
  constructor(private model: UserModel) {}

  public async create(user: IUserDTO): Promise<void> {
    await this.model.create(user);
  }
}

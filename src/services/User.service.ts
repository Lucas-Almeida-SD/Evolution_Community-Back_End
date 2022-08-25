import { IUserDTO } from '../interfaces/User.interface';
import UserModel from '../models/User.model';
import UserValidation from '../validations/User.validation';

export default class UserService {
  constructor(private model: UserModel) {}

  public async create(user: IUserDTO): Promise<void> {
    UserValidation.validateUserCreationObject(user);

    await this.model.create(user);
  }
}

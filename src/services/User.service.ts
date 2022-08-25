import { IUserDTO } from '../interfaces/User.interface';
import UserModel from '../models/User.model';
import UserValidation from '../validations/User.validation';

export default class UserService {
  constructor(private model: UserModel) {}

  public async create(user: IUserDTO): Promise<void> {
    UserValidation.validateUserCreationObject(user);
    UserValidation.validateBirthDate(user.birthDate);

    const getUser = await this.model.getUser(user.email);
    UserValidation.validatesUserExistence(getUser as IUserDTO | null);

    await this.model.create(user);
  }
}

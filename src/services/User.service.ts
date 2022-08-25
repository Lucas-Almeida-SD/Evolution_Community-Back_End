import generateToken from '../helpers/generateToken';
import { IUserDTO, IUserLogin } from '../interfaces/User.interface';
import UserModel from '../models/User.model';
import UserValidation from '../validations/User.validation';

export default class UserService {
  constructor(private model: UserModel) {}

  public async create(user: IUserDTO): Promise<void> {
    UserValidation.validateUserCreationObject(user);
    UserValidation.validateBirthDate(user.birthDate);

    const getUser = await this.model.getUser(user.email);
    UserValidation.validatesUserExistence(getUser as IUserDTO | null, 'create');

    await this.model.create(user);
  }

  public async login(userLogin: IUserLogin): Promise<{ user: IUserDTO, token: string }> {
    UserValidation.validateLogin(userLogin);

    const getUser = await this.model.getUser(userLogin.email);

    UserValidation.validatesUserExistence(getUser as IUserDTO | null, 'login');

    const user = getUser as IUserDTO;

    UserValidation.validatePassword(userLogin.password, user.password);

    const token = generateToken(user);

    return { user, token };
  }
}

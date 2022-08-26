import encryptPassword from '../helpers/encryptPassword';
import generateToken from '../helpers/generateToken';
import { IUserDTO, IUserEdit, IUserLogin } from '../interfaces/User.interface';
import UserModel from '../models/User.model';
import UserValidation from '../validations/User.validation';

export default class UserService {
  constructor(private model: UserModel) {}

  public async create(user: IUserDTO): Promise<void> {
    UserValidation.validateUserCreationObject(user);
    UserValidation.validateBirthDate(user.birthDate);

    const getUser = await this.model.getUser(user.email);
    UserValidation.validatesUserExistence(getUser as IUserDTO | null, 'create');

    const hashPassword = encryptPassword(user.password);

    await this.model.create({ ...user, password: hashPassword });
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

  public async edit(editUser: IUserEdit, userToken: UserToken): Promise<void> {
    UserValidation.validateUserEditObject(editUser);

    if (editUser.birthDate) UserValidation.validateBirthDate(editUser.birthDate);

    const getUser = await this.model.getUser(userToken.email);
    UserValidation.validatesUserExistence(getUser as IUserDTO | null, 'edit');

    if (editUser.email) {
      UserValidation.validateEditEmail(editUser);
    }

    const newEditUser = editUser;
    if (newEditUser.password) {
      newEditUser.password = encryptPassword(newEditUser.password);
    }

    await this.model.edit(editUser, userToken);
  }

  public async remove(userToken: UserToken): Promise<void> {
    const getUser = await this.model.getUser(userToken.email);
    UserValidation.validatesUserExistence(getUser as IUserDTO | null, 'remove');

    await this.model.remove(userToken);
  }
}

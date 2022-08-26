import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import isExists from 'date-fns/isExists';
import bcrypt from 'bcryptjs';
import throwMyErrorObject from '../helpers/throwMyErrorObject';
import { IUserDTO, IUserEdit, IUserLogin } from '../interfaces/User.interface';

export default abstract class UserValidation {
  public static validateUserCreationObject(user: IUserDTO) {
    const { error } = Joi.object({
      fullname: Joi.string().min(3).required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      CPF: Joi.string().min(11).max(11).required(),
      RG: Joi.string().min(3).required(),
      birthDate: Joi.string().required(),
      password: Joi.string().min(8).required(),
      publicPlace: Joi.string().required(),
      address: Joi.string().required(),
      houseNumber: Joi.number().min(1).required(),
      district: Joi.string().required(),
      city: Joi.string().required(),
      CEP: Joi.string().min(9).max(9).required(),
      complement: Joi.string().allow('', null),
      plan: Joi.string().required(),
    }).validate(user);

    if (error) throwMyErrorObject(StatusCodes.BAD_REQUEST, error.message);
  }

  public static validateBirthDate(birthDate: string) {
    const birthDateRegex = /\d{2}\/\d{2}\/\d{4}/;
    const match = birthDate.match(birthDateRegex);

    if (!match || match[0] !== birthDate) {
      throwMyErrorObject(StatusCodes.BAD_REQUEST, 'Invalid birthDate format');
    }

    const [day, month, year] = birthDate.split('/');

    if (!isExists(Number(year), Number(month) - 1, Number(day))) {
      throwMyErrorObject(StatusCodes.BAD_REQUEST, 'Invalid birthDate');
    }
  }

  public static validatesUserExistence(
    user: IUserDTO | null,
    operation: 'create' | 'login' | 'edit',
  ) {
    if (operation === 'create' && user) {
      throwMyErrorObject(StatusCodes.CONFLICT, 'User already exists');
    }

    if ((operation === 'login' || operation === 'edit') && !user) {
      throwMyErrorObject(StatusCodes.NOT_FOUND, 'User not found');
    }
  }

  public static validateLogin(userLogin: IUserLogin) {
    const { error } = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validate(userLogin);

    if (error) throwMyErrorObject(StatusCodes.BAD_REQUEST, error.message);
  }

  public static validatePassword(passwordLogin: string, passwordUser: string) {
    const validate = bcrypt.compareSync(passwordLogin, passwordUser);

    if (!validate) {
      throwMyErrorObject(StatusCodes.UNAUTHORIZED, 'Incorrect password');
    }
  }

  public static validateUserEditObject(editUser: IUserEdit) {
    const { error } = Joi.object({
      fullname: Joi.string().min(3),
      phone: Joi.string(),
      email: Joi.string().email(),
      CPF: Joi.string().min(11).max(11),
      RG: Joi.string().min(3),
      birthDate: Joi.string(),
      password: Joi.string().min(8),
      publicPlace: Joi.string(),
      address: Joi.string(),
      houseNumber: Joi.number().min(1),
      district: Joi.string(),
      city: Joi.string(),
      CEP: Joi.string().min(9).max(9),
      complement: Joi.string().allow('', null),
      plan: Joi.string(),
    }).validate(editUser);

    if (error) throwMyErrorObject(StatusCodes.BAD_REQUEST, error.message);
  }
}

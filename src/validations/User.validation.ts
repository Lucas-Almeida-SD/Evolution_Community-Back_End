import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import isExists from 'date-fns/isExists';
import throwMyErrorObject from '../helpers/throwMyErrorObject';
import { IUserDTO } from '../interfaces/User.interface';

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

  public static validatesUserExistence(user: IUserDTO | null) {
    if (user) throwMyErrorObject(StatusCodes.CONFLICT, 'User already exists');
  }
}

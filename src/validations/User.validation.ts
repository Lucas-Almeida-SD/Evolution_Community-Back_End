import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import throwMyErrorObject from '../helpers/throwMyErrorObject';
import { IUserDTO } from '../interfaces/User.interface';

export default abstract class UserValidation {
  public static validateUserCreationObject(user: IUserDTO) {
    const { error } = Joi.object({
      fullname: Joi.string().min(3).required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      CPF: Joi.number().min(11).max(11).required(),
      RG: Joi.number().min(3).required(),
      birthDate: Joi.date().required(),
      password: Joi.string().min(8).required(),
      publicPlace: Joi.string().required(),
      address: Joi.string().required(),
      houseNumber: Joi.number().min(1).required(),
      district: Joi.string().required(),
      city: Joi.string().required(),
      CEP: Joi.string().min(9).max(9).required(),
      complement: Joi.string(),
      plan: Joi.string().required(),
    }).validate(user);

    if (error) throwMyErrorObject(StatusCodes.BAD_REQUEST, error.message);
  }
}

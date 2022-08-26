import { Router } from 'express';
import rescue from 'express-rescue';
import UserController from '../controllers/User.controller';
import UserService from '../services/User.service';
import UserModel from '../models/User.model';
import Middlewares from '../middlewares/middlewares';

const userRouter = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

userRouter.post('/', rescue(userController.create));
userRouter.post('/login', rescue(userController.login));
userRouter.put('/', rescue(Middlewares.authentication), rescue(userController.edit));
userRouter.delete('/', rescue(Middlewares.authentication), rescue(userController.remove));

export default userRouter;

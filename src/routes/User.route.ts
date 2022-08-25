import { Router } from 'express';
import rescue from 'express-rescue';
import UserController from '../controllers/User.controller';
import UserService from '../services/User.service';
import UserModel from '../models/User.model';

const userRouter = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

userRouter.post('/', rescue(userController.create));
userRouter.post('/login', rescue(userController.login));

export default userRouter;

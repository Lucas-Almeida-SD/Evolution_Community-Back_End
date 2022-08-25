import express from 'express';
import cors from 'cors';

import userRouter from './routes/User.route';
import Middlewares from './middlewares/middlewares';

const api = express();
api.use(cors());
api.use(express.json());

api.use('/users', userRouter);

api.use(Middlewares.errorMiddleware);

export default api;

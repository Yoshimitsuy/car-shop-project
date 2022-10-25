import express from 'express';
import 'express-async-errors';
import routerCar from './routes/carRoutes';
import errorHandler from './middlewares/errorMiddlewares';

const app = express();

app.use(express.json());

app.use(routerCar);

app.use(errorHandler);

export default app;

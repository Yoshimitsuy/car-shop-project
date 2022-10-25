import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarService from '../services/CarService';
import CarModel from '../models/CarModel';

const routerCar = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

routerCar.post('/cars', (req, res) => carController.create(req, res));
routerCar.get('/cars', (req, res) => carController.showAll(req, res));
routerCar.get('/cars/:id', (req, res) => carController.showOne(req, res));
routerCar.put('/cars/:id', (req, res) => carController.upCar(req, res));
routerCar.delete('/cars/:id', (req, res) => carController.destroy(req, res));

export default routerCar;

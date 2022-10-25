import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  async create(
    req: Request,
    res: Response<ICar>,
  ) {
    const created = await this._service.create(req.body);
  
    return res.status(201).json(created);
  }

  async showAll(req: Request, res: Response<ICar[]>) {
    const dataCars = await this._service.read();

    res.status(200).json(dataCars);
  }

  async showOne(req: Request, res: Response<ICar>) {
    const data = await this._service.readOne(req.params.id);

    res.status(200).json(data);
  }

  async upCar(req: Request, res: Response<ICar>) {
    const data = await this._service.update(req.params.id, req.body);

    res.status(200).json(data);
  }

  async destroy(req: Request, res: Response<ICar>) {
    await this._service.delete(req.params.id);

    res.status(204).json();
  }
}

import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
// import CustomErrors from '../errors/CustomErrors';

class CarService implements IService<ICar> {
  private _cars:IModel<ICar>;
  private _error: string;

  constructor(model:IModel<ICar>) {
    this._cars = model;
    this._error = 'not found';
  }

  async create(obj: unknown):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._cars.create(parsed.data);
  }
}

export default CarService;
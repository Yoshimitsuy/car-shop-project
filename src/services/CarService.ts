import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import CustomErrors from '../errors/CustomErrors';

class CarService implements IService<ICar> {
  private _cars:IModel<ICar>;
  private _error: string;

  constructor(model:IModel<ICar>) {
    this._cars = model;
    this._error = 'Object not found';
  }

  async create(obj: unknown):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._cars.create(parsed.data);
  }

  async read():Promise<ICar[]> {
    return this._cars.read();
  }

  async readOne(_id: string):Promise<ICar> {
    const data = await this._cars.readOne(_id);

    if (!data) throw new CustomErrors(404, this._error);

    return data;
  }

  async update(_id: string, obj: ICar): Promise<ICar> {
    const data = CarZodSchema.safeParse(obj);

    if (!data.success) throw data.error;

    const dataUp = await this._cars.update(_id, obj);

    if (!dataUp) throw new CustomErrors(404, this._error);

    return dataUp;
  }

  async delete(_id: string): Promise<ICar> {
    const data = await this._cars.delete(_id);

    if (!data) throw new CustomErrors(404, this._error);

    return data;
  }
}

export default CarService;

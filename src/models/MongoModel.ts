import { isValidObjectId, Model } from 'mongoose';
import CustomErrors from '../errors/CustomErrors';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;
  private _errorMongo: string;

  constructor(model:Model<T>) {
    this._model = model;
    this._errorMongo = 'Id must have 24 hexadecimal characters';
  }

  async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }

  async read(): Promise<T[]> {
    return this._model.find();
  }

  async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new CustomErrors(400, this._errorMongo);
    
    return this._model.findOne({ _id });
  }

  async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new CustomErrors(400, this._errorMongo);

    const data = await this._model.findByIdAndUpdate(_id, obj, { new: true });

    return data;
  }

  async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new CustomErrors(400, this._errorMongo);

    const data = this._model.findByIdAndDelete({ _id });

    return data;
  }
}

export default MongoModel;

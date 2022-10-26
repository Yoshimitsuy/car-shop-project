// template para criação dos testes de cobertura da camada de service

import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { Model } from 'mongoose';
import { carMock, carMockId } from '../mocks/carMocks';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('sucessfully created', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carMockId)
    });
  })

});
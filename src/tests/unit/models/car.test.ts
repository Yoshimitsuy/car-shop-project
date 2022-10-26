// template para criação dos testes de cobertura da camada de model

import * as sinon from 'sinon';
import chai from 'chai';
import CarModel  from '../../../models/CarModel';
import { Model } from 'mongoose';
import { carMock, carMockId } from '../mocks/carMocks';
const { expect } = chai;


describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockId);
    sinon.stub(Model, 'findOne').resolves(carMockId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('success', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockId)
    });
  })

});

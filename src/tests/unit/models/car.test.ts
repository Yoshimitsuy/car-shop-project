// template para criação dos testes de cobertura da camada de model

import * as sinon from 'sinon';
import chai from 'chai';
import CarModel  from '../../../models/CarModel';
import { Model } from 'mongoose';
import { carMock, carMockId, setCarMock, setCarMockId } from '../mocks/carMocks';
const { expect } = chai;


describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockId);
    sinon.stub(Model, 'findOne').resolves(carMockId);
    sinon.stub(Model, 'find').resolves([carMockId]);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockId)
    });
  })

  describe('access denied', () => {
    it('_id not found', async () => {
      try {
        await carModel.readOne('CapitãoTeemoNoComando')
      } catch (error: any) {
        expect(error.message).to.be.eq('Id must have 24 hexadecimal characters');
      }
    });

    it('successfully found', async () => {
      const carFound = await carModel.readOne(carMockId._id);
      expect(carFound).to.be.deep.equal(carMockId);
    });

    it('', async () => {
      const cars = await carModel.read();
      expect (cars).to.be.deep.equal([carMockId]);
    })
  });

    
});

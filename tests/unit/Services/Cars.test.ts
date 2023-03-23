import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Testando métodos relacionados a Car', function () {
  const inputCar: ICar = {
    model: 'Voyage',
    year: 2015,
    color: 'Preto',
    status: true,
    buyValue: 30.000,
    doorsQty: 4,
    seatsQty: 5,
  };
  it('Cadastrando um carro com sucesso', async function () {
    const outputCar: ICar = {
      id: '634852326b35b59438fbea2f',
      ...inputCar,
    };

    Sinon.stub(Model, 'create').resolves(outputCar);

    const service = new CarService();
    const createCar = await service.create(inputCar);
    expect(createCar).to.be.deep.equal(outputCar);
  });

  it('Retornando um carro com sucesso', async function () {
    const outputCar: Car = new Car(inputCar);

    Sinon.stub(Model, 'findById').resolves(inputCar);

    const service = new CarService();
    const result = await service.getById('634852326b35b59438fbea2f');
    expect(result).to.be.deep.equal(outputCar);
  });

  it('Retornando null caso o id seja inexistente', async function () {
    Sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new CarService();
      await service.getById('999gggsss');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  afterEach(function () {
    Sinon.restore();
  });
});

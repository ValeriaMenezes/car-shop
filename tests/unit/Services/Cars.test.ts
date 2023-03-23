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

  it('Retornando a mensagem esperada caso o id seja inexistente', async function () {
    Sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new CarService();
      await service.getById('999gggsss');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Retornando todos os carros', async function () {
    const inputAllCars = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    const mapingAllCars = inputAllCars.map((car) => new Car(car));

    Sinon.stub(Model, 'find').resolves(mapingAllCars);

    const service = new CarService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(mapingAllCars);
  });

  it('Atualizando um carro', async function () {
    const carInput = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    const outputCar = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: false,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    Sinon.stub(Model, 'findByIdAndUpdate').resolves(carInput);

    const service = new CarService();
    const result = await service.update(
      '634852326b35b59438fbea2f',
      carInput,
    );

    expect(result).to.be.deep.equal(outputCar);
  });

  afterEach(function () {
    Sinon.restore();
  });
});

import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import IMotorcycles from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Testando métodos relacionados a motorcycle', function () {
  const inputMotorcycle: IMotorcycles = {
    model: 'Honda',
    year: 2015,
    color: 'Preto',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };
  it('Cadastrando uma moto com sucesso', async function () {
    const outputMotorcycle: IMotorcycles = {
      id: '634852326b35b59438fbea2f',
      ...inputMotorcycle,
    };

    Sinon.stub(Model, 'create').resolves(outputMotorcycle);

    const service = new MotorcycleService();
    const createMotorcycle = await service.create(inputMotorcycle);
    expect(createMotorcycle).to.be.deep.equal(outputMotorcycle);
  });

  it('Retornando uma moto com sucesso', async function () {
    const outputMotorcycle: Motorcycle = new Motorcycle(inputMotorcycle);

    Sinon.stub(Model, 'findById').resolves(inputMotorcycle);

    const service = new MotorcycleService();
    const result = await service.getById('634852326b35b59438fbea2f');
    expect(result).to.be.deep.equal(outputMotorcycle);
  });

  it('Retornando a mensagem esperda caso o id seja inexistente', async function () {
    Sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new MotorcycleService();
      await service.getById('999gggsss');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Retornando todos as motos', async function () {
    const inputAllMotorCycles = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        category: 'Street',
        engineCapacity: 1000,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];

    const mapingAllMotorCycles = inputAllMotorCycles
      .map((motorcycle) => new Motorcycle(motorcycle));

    Sinon.stub(Model, 'find').resolves(mapingAllMotorCycles);

    const service = new MotorcycleService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(mapingAllMotorCycles);
  });

  it('Atualizando uma moto', async function () {
    const motorcycleInput = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      buyValue: 15.99,
      category: 'Street',
      engineCapacity: 1000,
    };

    const outputMototcycle = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: false,
      buyValue: 15.99,
      category: 'Street',
      engineCapacity: 1000,
    };

    Sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleInput);

    const service = new MotorcycleService();
    const result = await service.update(
      '634852326b35b59438fbea2f',
      motorcycleInput,
    );

    expect(result).to.be.deep.equal(outputMototcycle);
  });

  afterEach(function () {
    Sinon.restore();
  });
});

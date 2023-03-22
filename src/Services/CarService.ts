import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carODM = new CarODM();
    const cars = await carODM.getAll();
    const carsMaping = cars.map((car) => this.createCarDomain(car));
    return carsMaping;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const idCar = await carODM.getById(id);
    return this.createCarDomain(idCar);
  }
}
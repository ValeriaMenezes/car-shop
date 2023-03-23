import MotorcycleODM from '../Models/MotorcycleODM';
import IMotorcycle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.getAll();
    const motorcycleMaping = motorcycles
      .map((motorcycle) => this.createMotorcycleDomain(motorcycle));
    return motorcycleMaping;
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const idmotorcycle = await motorcycleODM.getById(id);
    return this.createMotorcycleDomain(idmotorcycle);
  }

  public async update(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const updatedMotorcycle = await motorcycleODM.update(id, motorcycle);
    return this.createMotorcycleDomain(updatedMotorcycle);
  }
}
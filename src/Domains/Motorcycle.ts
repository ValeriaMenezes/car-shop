import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super({
      model: motorcycle.model,
      year: motorcycle.year,
      color: motorcycle.color,
      status: motorcycle.status,
      buyValue: motorcycle.buyValue,
      id: motorcycle.id,
    });
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
}

export default Motorcycle;
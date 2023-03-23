import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const newMotorcycle = this.req.body;
    try {
      const motorcycle = await this.service.create(newMotorcycle);
      return this.res.status(201).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const motorcycles = await this.service.getAll();
      return this.res.status(200).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const idMotorcycle = await this.service.getById(id);
      if (!idMotorcycle) return this.res.status(404).json({ message: 'Motorcycle not found' });
      return this.res.status(200).json(idMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const motorcycle = this.req.body;
    try {
      const updatedMotorcycle = await this.service.update(id, motorcycle);
      if (!updatedMotorcycle) return this.res.status(404).json({ message: 'Motorcycle not found' });
      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;
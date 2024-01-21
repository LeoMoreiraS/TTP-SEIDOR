import { type Request, type Response } from 'express';
import type { IDriverRepository } from '../repositories/IDriverRepository';
import { errorHandler } from '../utils/errorHandler';
import { type Prisma } from '@prisma/client';
import { idValidator } from '../utils/idValidator';

export class DriverController {
  constructor (private readonly DriverRepository: IDriverRepository) {}

  async getDrivers (req: Request, res: Response): Promise<void> {
    try {
      const Drivers = await this.DriverRepository.findAllDrivers();
      res.json(Drivers);
    } catch (error) {
      errorHandler(error);
    }
  }

  async getDriverById (req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (id === undefined) {
      errorHandler(new Error('Missing required parameter: id'));
    }
    if (idValidator(id)) {
      errorHandler(new Error('Invalid id'));
    }

    try {
      const Driver = await this.DriverRepository.findDriverById(Number(id));
      if (Driver !== null) {
        res.json(Driver);
      } else {
        res.status(404).json({ error: 'Driver not found' });
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  async createDriver (req: Request, res: Response): Promise<void> {
    const DriverData: Prisma.DriverCreateInput = req.body;

    if (DriverData?.name === undefined) {
      errorHandler(new Error('Missing required fields in request body'));
    }

    try {
      const Driver = await this.DriverRepository.createDriver(DriverData);

      res.status(201).json(Driver);
    } catch (error) {
      errorHandler(error);
    }
  }

  async updateDriver (req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (idValidator(id)) {
        errorHandler(new Error('Invalid id'));
      }

      const DriverData: Prisma.DriverUpdateInput = req.body;
      if (DriverData?.name === undefined) {
        errorHandler(new Error('Missing required fields in request body'));
      }

      const updatedDriver = await this.DriverRepository.updateDriver(Number(id), DriverData);

      if (updatedDriver !== null) {
        res.json(updatedDriver);
      } else {
        res.status(404).json({ error: 'Driver not found' });
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  async deleteDriver (req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (idValidator(id)) {
        errorHandler(new Error('Invalid id'));
      }

      const deletedDriver = await this.DriverRepository.deleteDriver(Number(id));
      if (deletedDriver !== null) {
        res.json(deletedDriver);
      } else {
        res.status(404).json({ error: 'Driver not found' });
      }
    } catch (error) {
      errorHandler(error);
    }
  }
}

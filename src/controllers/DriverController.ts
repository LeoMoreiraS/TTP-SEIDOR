import { type Request, type Response } from 'express';
import type { IDriverRepository } from '../repositories/IDriverRepository';
import { errorHandler } from '../utils/errorHandler';
import { type Prisma } from '@prisma/client';
import { idValidator } from '../utils/idValidator';

export class DriverController {
  constructor (private readonly DriverRepository: IDriverRepository) {}

  async getDrivers (req: Request, res: Response): Promise<Response> {
    try {
      const body: { name?: string } = req.query;

      const Drivers = await this.DriverRepository.findAllDrivers(body.name);
      return res.json(Drivers);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  async getDriverById (req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (id === undefined) {
      return errorHandler('Missing required parameter: id', res);
    }
    if (idValidator(id)) {
      return errorHandler('Invalid id', res);
    }

    try {
      const Driver = await this.DriverRepository.findDriverById(Number(id));
      if (Driver !== null) {
        return res.json(Driver);
      } else {
        return errorHandler('Driver not found', res, 404);
      }
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  async createDriver (req: Request, res: Response): Promise<Response> {
    const DriverData: Prisma.DriverCreateInput = req.body;

    if (DriverData?.name === undefined) {
      return errorHandler('Missing required fields in request body', res);
    }

    try {
      const Driver = await this.DriverRepository.createDriver(DriverData);

      return res.status(201).json(Driver);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  async updateDriver (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (idValidator(id)) {
        return errorHandler('Invalid id', res);
      }

      const DriverData: Prisma.DriverUpdateInput = req.body;
      if (DriverData?.name === undefined) {
        return errorHandler('Missing required fields in request body', res);
      }

      const updatedDriver = await this.DriverRepository.updateDriver(Number(id), DriverData);

      if (updatedDriver !== null) {
        return res.json(updatedDriver);
      } else {
        return errorHandler('Driver not found', res, 404);
      }
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  async deleteDriver (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (idValidator(id)) {
        return errorHandler('Invalid id', res);
      }

      const deletedDriver = await this.DriverRepository.deleteDriver(Number(id));
      if (deletedDriver !== null) {
        return res.json(deletedDriver);
      } else {
        return errorHandler('Driver not found', res, 404);
      }
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}

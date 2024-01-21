import { type Request, type Response } from 'express';

import { errorHandler } from '../utils/errorHandler';
import { type ICreateUsageDTO, type IAutomobileUsageRepository } from '../repositories/IAutomobileUsageRepository';
import { idValidator } from '../utils/idValidator';

export class AutomobileUsageController {
  constructor (private readonly automobileUsageRepository: IAutomobileUsageRepository) {}

  async getAutomobilesUsage (req: Request, res: Response): Promise<Response> {
    try {
      const automobilesUsage = await this.automobileUsageRepository.listAutomobileUsages();
      return res.json(automobilesUsage);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  async createAutomobileUsage (req: Request, res: Response): Promise<Response> {
    const automobileData: ICreateUsageDTO = req.body;

    if (automobileData?.purpose === undefined || automobileData?.driverId === undefined || automobileData?.automobileId === undefined) {
      return errorHandler('Missing required fields in request body', res);
    }

    try {
      const isDriverUsingAutomobile = await this.automobileUsageRepository.checkExistingUsageForDriver(automobileData?.driverId);

      if (isDriverUsingAutomobile !== null) {
        return errorHandler('Driver is already using a automobile', res);
      }

      const isAutomobileBeingUsed = await this.automobileUsageRepository.checkExistingUsageForAutomobile(automobileData?.driverId);

      if (isAutomobileBeingUsed !== null) {
        return errorHandler('Automobile is already in use', res);
      }

      const automobileUsage = await this.automobileUsageRepository.createAutomobileUsage(automobileData);

      return res.status(201).json(automobileUsage);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  async updateAutomobileUsageByDriver (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (idValidator(id)) {
        return errorHandler('Invalid id', res);
      }

      const isDriverUsingAutomobile = await this.automobileUsageRepository.checkExistingUsageForDriver(Number(id));

      if (isDriverUsingAutomobile === null) {
        return errorHandler('Driver is not currently using a automobile', res);
      }

      const finishedAutomobileUsage = await this.automobileUsageRepository.endAutomobileUsage(Number(isDriverUsingAutomobile.id));

      return res.json(finishedAutomobileUsage);
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}

import { type Request, type Response } from 'express';
import type { IAutomobileRepository, IFilterAutomobilesDTO } from '../repositories/IAutomobileRepository';
import { errorHandler } from '../utils/errorHandler';
import { type Prisma } from '@prisma/client';
import { idValidator } from '../utils/idValidator';

export class AutomobileController {
  constructor (private readonly automobileRepository: IAutomobileRepository) {}

  async getAutomobiles (req: Request, res: Response): Promise<Response> {
    try {
      const optionalParams: IFilterAutomobilesDTO = req.query;
      const automobiles = await this.automobileRepository.findAllAutomobiles(optionalParams);
      return res.json(automobiles);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  async getAutomobileById (req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (id === undefined) {
      return errorHandler('Missing required parameter: id', res);
    }
    if (idValidator(id)) {
      return errorHandler('Invalid id', res);
    }

    try {
      const automobile = await this.automobileRepository.findAutomobileById(Number(id));
      if (automobile !== null) {
        return res.json(automobile);
      } else {
        return errorHandler('Automobile not found', res, 404);
      }
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  async createAutomobile (req: Request, res: Response): Promise<Response> {
    const automobileData: Prisma.AutomobileCreateInput = req.body;

    if (automobileData?.color === undefined || automobileData?.brand === undefined || automobileData?.plate === undefined) {
      return errorHandler('Missing required fields in request body', res);
    }

    try {
      const automobile = await this.automobileRepository.createAutomobile(automobileData);

      return res.status(201).json(automobile);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  async updateAutomobile (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (idValidator(id)) {
        return errorHandler('Invalid id', res);
      }

      const automobileData: Prisma.AutomobileUpdateInput = req.body;
      if (automobileData?.color === undefined && automobileData?.brand === undefined && automobileData?.plate === undefined) {
        return errorHandler('Missing required fields in request body', res);
      }

      const updatedAutomobile = await this.automobileRepository.updateAutomobile(Number(id), automobileData);

      if (updatedAutomobile !== null) {
        return res.json(updatedAutomobile);
      } else {
        return errorHandler('Automobile not found', res, 404);
      }
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  async deleteAutomobile (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (idValidator(id)) {
        return errorHandler('Invalid id', res);
      }

      const deletedAutomobile = await this.automobileRepository.deleteAutomobile(Number(id));
      if (deletedAutomobile !== null) {
        return res.status(204).json(deletedAutomobile);
      } else {
        return errorHandler('Automobile not found', res, 404);
      }
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}

import { type Request, type Response } from 'express';
import type { IAutomobileRepository } from '../repositories/IAutomobileRepository';
import { errorHandler } from '../utils/errorHandler';
import { type Prisma } from '@prisma/client';
import { idValidator } from '../utils/idValidator';

export class AutomobileController {
  constructor (private readonly automobileRepository: IAutomobileRepository) {}

  async getAutomobiles (req: Request, res: Response): Promise<void> {
    try {
      const automobiles = await this.automobileRepository.findAllAutomobiles();
      res.json(automobiles);
    } catch (error) {
      errorHandler(error);
    }
  }

  async getAutomobileById (req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (id === undefined) {
      errorHandler(new Error('Missing required parameter: id'));
    }
    if (idValidator(id)) {
      errorHandler(new Error('Invalid id'));
    }

    try {
      const automobile = await this.automobileRepository.findAutomobileById(Number(id));
      if (automobile !== null) {
        res.json(automobile);
      } else {
        res.status(404).json({ error: 'Automobile not found' });
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  async createAutomobile (req: Request, res: Response): Promise<void> {
    const automobileData: Prisma.AutomobileCreateInput = req.body;

    if (automobileData?.color === undefined || automobileData?.brand === undefined || automobileData?.plate === undefined) {
      errorHandler(new Error('Missing required fields in request body'));
    }

    try {
      const automobile = await this.automobileRepository.createAutomobile(automobileData);

      res.status(201).json(automobile);
    } catch (error) {
      errorHandler(error);
    }
  }

  async updateAutomobile (req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (idValidator(id)) {
        errorHandler(new Error('Invalid id'));
      }

      const automobileData: Prisma.AutomobileUpdateInput = req.body;
      if (automobileData?.color === undefined && automobileData?.brand === undefined && automobileData?.plate === undefined) {
        errorHandler(new Error('Missing required fields in request body'));
      }

      const updatedAutomobile = await this.automobileRepository.updateAutomobile(Number(id), automobileData);

      if (updatedAutomobile !== null) {
        res.json(updatedAutomobile);
      } else {
        res.status(404).json({ error: 'Automobile not found' });
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  async deleteAutomobile (req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (idValidator(id)) {
        errorHandler(new Error('Invalid id'));
      }

      const deletedAutomobile = await this.automobileRepository.deleteAutomobile(Number(id));
      if (deletedAutomobile !== null) {
        res.json(deletedAutomobile);
      } else {
        res.status(404).json({ error: 'Automobile not found' });
      }
    } catch (error) {
      errorHandler(error);
    }
  }
}

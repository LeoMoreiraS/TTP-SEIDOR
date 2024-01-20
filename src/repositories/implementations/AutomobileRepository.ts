import { type Prisma, type PrismaClient, type Automobile } from '@prisma/client';
import type IAutomobileRepository from '../IAutomobileRepository';

class AutomobileRepository implements IAutomobileRepository {
  constructor (readonly prisma: PrismaClient) {};

  async createAutomobile (data: Prisma.AutomobileCreateInput): Promise<Automobile> {
    return await this.prisma.automobile.create({
      data
    });
  }
}

export default AutomobileRepository;

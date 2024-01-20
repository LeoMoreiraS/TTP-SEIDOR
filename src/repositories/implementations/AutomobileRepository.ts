import { type Prisma, type PrismaClient, type Automobile } from '@prisma/client';
import type IAutomobileRepository from '../IAutomobileRepository';

class AutomobileRepository implements IAutomobileRepository {
  constructor (readonly prisma: PrismaClient) {};

  async createAutomobile (data: Prisma.AutomobileCreateInput): Promise<Automobile> {
    return await this.prisma.automobile.create({
      data
    });
  }

  async findAllAutomobiles (): Promise<Automobile[]> {
    return await this.prisma.automobile.findMany();
  }

  async findAutomobileById (id: number): Promise<Automobile | null> {
    return await this.prisma.automobile.findUnique({
      where: { id }
    });
  }

  async updateAutomobile (id: number, data: Prisma.AutomobileUpdateInput): Promise<Automobile> {
    return await this.prisma.automobile.update({
      where: { id },
      data
    });
  }
}

export default AutomobileRepository;

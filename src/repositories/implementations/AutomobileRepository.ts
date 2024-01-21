import { type Prisma, type PrismaClient, type Automobile } from '@prisma/client';
import { type IFilterAutomobilesDTO, type IAutomobileRepository } from '../IAutomobileRepository';

export class AutomobileRepository implements IAutomobileRepository {
  constructor (readonly prisma: PrismaClient) {};

  async createAutomobile (data: Prisma.AutomobileCreateInput): Promise<Automobile> {
    return await this.prisma.automobile.create({
      data
    });
  }

  async findAllAutomobiles ({ color, brand }: IFilterAutomobilesDTO): Promise<Automobile[]> {
    const filterOptions = {};
    if (color !== undefined) Object.assign(filterOptions, { ...filterOptions, color: { equals: color } });
    if (brand !== undefined) Object.assign(filterOptions, { ...filterOptions, brand: { equals: brand } });

    return await this.prisma.automobile.findMany({ where: filterOptions });
  }

  async findAutomobileById (id: number): Promise<Automobile | null> {
    return await this.prisma.automobile.findUnique({
      where: { id }
    });
  }

  async updateAutomobile (id: number, data: Prisma.AutomobileUpdateInput): Promise<Automobile | null> {
    return await this.prisma.automobile.update({
      where: { id },
      data
    });
  }

  async deleteAutomobile (id: number): Promise<Automobile | null> {
    return await this.prisma.automobile.delete({
      where: { id }
    });
  }
}

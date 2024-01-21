import { type Prisma, type PrismaClient, type Driver } from '@prisma/client';
import { type IDriverRepository } from '../IDriverRepository';

export class DriverRepository implements IDriverRepository {
  constructor (readonly prisma: PrismaClient) {};

  async createDriver (data: Prisma.DriverCreateInput): Promise<Driver> {
    return await this.prisma.driver.create({
      data
    });
  }

  async findAllDrivers (): Promise<Driver[]> {
    return await this.prisma.driver.findMany();
  }

  async findDriverById (id: number): Promise<Driver | null> {
    return await this.prisma.driver.findUnique({
      where: { id }
    });
  }

  async updateDriver (id: number, data: Prisma.DriverUpdateInput): Promise<Driver | null> {
    return await this.prisma.driver.update({
      where: { id },
      data
    });
  }

  async deleteDriver (id: number): Promise<Driver | null> {
    return await this.prisma.driver.delete({
      where: { id }
    });
  }
}

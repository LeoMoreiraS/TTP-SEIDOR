import { type Driver, type Prisma, type PrismaClient } from '@prisma/client';

export interface IDriverRepository {
  readonly prisma: PrismaClient

  createDriver: (data: Prisma.DriverCreateInput) => Promise<Driver>

  findAllDrivers: () => Promise<Driver[]>

  findDriverById: (id: number) => Promise<Driver | null>

  updateDriver: (id: number, data: Prisma.DriverUpdateInput) => Promise<Driver | null>

  deleteDriver: (id: number) => Promise<Driver | null>
}

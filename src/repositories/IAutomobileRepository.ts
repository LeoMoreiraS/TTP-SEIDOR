import { type Automobile, type Prisma, type PrismaClient } from '@prisma/client';

export interface AutomobileRepository {
  readonly prisma: PrismaClient

  createAutomobile: (data: Prisma.AutomobileCreateInput) => Promise<Automobile>

  findAllAutomobiles: () => Promise<Automobile[]>

  findAutomobileById: (id: number) => Promise<Automobile | null>

  updateAutomobile: (id: number, data: Prisma.AutomobileUpdateInput) => Promise<Automobile>
}

export default AutomobileRepository;

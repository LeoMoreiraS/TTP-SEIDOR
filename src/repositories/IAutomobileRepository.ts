import { type Automobile, type Prisma, type PrismaClient } from '@prisma/client';

export interface AutomobileRepository {
  readonly prisma: PrismaClient

  createAutomobile: (data: Prisma.AutomobileCreateInput) => Promise<Automobile>

}

export default AutomobileRepository;

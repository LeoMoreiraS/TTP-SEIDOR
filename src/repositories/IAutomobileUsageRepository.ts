import { type AutomobileUsage, type PrismaClient } from '@prisma/client';

export interface ICreateUsageDTO {
  purpose: string
  driverId: number
  automobileId: number
}

export interface IAutomobileUsageRepository {
  readonly prisma: PrismaClient

  createAutomobileUsage: (data: ICreateUsageDTO) => Promise<AutomobileUsage>
  checkExistingUsageForDriver: (driverId: number) => Promise<AutomobileUsage | null>
  checkExistingUsageForAutomobile: (automobileId: number) => Promise<AutomobileUsage | null>
  endAutomobileUsage: (driverId: number) => Promise<AutomobileUsage>
  listAutomobileUsages: () => Promise<AutomobileUsage[]>
}

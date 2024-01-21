import { type PrismaClient, type AutomobileUsage } from '@prisma/client';
import { type IAutomobileUsageRepository, type ICreateUsageDTO } from '../IAutomobileUsageRepository';

export class AutomobileUsageRepository implements IAutomobileUsageRepository {
  constructor (readonly prisma: PrismaClient) {}

  async createAutomobileUsage ({ automobileId, driverId, purpose }: ICreateUsageDTO): Promise<AutomobileUsage> {
    return await this.prisma.automobileUsage.create({
      data: {
        purpose,
        driver: {
          connect: { id: driverId }
        },
        automobile: {
          connect: { id: automobileId }
        }
      }
    });
  }

  async checkExistingUsageForDriver (driverId: number): Promise<AutomobileUsage | null> {
    return await this.prisma.automobileUsage.findFirst({
      where: { driverId, endDate: null }
    });
  }

  async checkExistingUsageForAutomobile (automobileId: number): Promise<AutomobileUsage | null> {
    return await this.prisma.automobileUsage.findFirst({
      where: { automobileId, endDate: null }
    });
  }

  async endAutomobileUsage (
    id: number
  ): Promise<AutomobileUsage> {
    return await this.prisma.automobileUsage.update({
      where: { id },
      data: {
        endDate: new Date()
      }
    });
  }

  async listAutomobileUsages (): Promise<AutomobileUsage[]> {
    return await this.prisma.automobileUsage.findMany({ include: { driver: true, automobile: true } });
  }
}

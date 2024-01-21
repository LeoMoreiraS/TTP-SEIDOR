import { PrismaClient } from '@prisma/client';

import { AutomobileRepository } from '../repositories/implementations/AutomobileRepository';
import { DriverRepository } from '../repositories/implementations/DriverRepository';
import { AutomobileUsageRepository } from '../repositories/implementations/AutomobileUsageRepository';
import { type IAutomobileRepository } from '../repositories/IAutomobileRepository';
import { type IDriverRepository } from '../repositories/IDriverRepository';
import { type IAutomobileUsageRepository } from '../repositories/IAutomobileUsageRepository';

export class RepositoryFactory {
  private _automobileInstance: IAutomobileRepository | undefined;
  private _driverInstance: IDriverRepository | undefined;
  private _automobileUsageInstance: IAutomobileUsageRepository | undefined;
  private _prismaClient: PrismaClient | undefined;
  getORMInstance (): PrismaClient {
    if (this._prismaClient === undefined) this._prismaClient = new PrismaClient();
    return this._prismaClient;
  }

  automobileSingleton (): IAutomobileRepository {
    if (this._automobileInstance === undefined) this._automobileInstance = new AutomobileRepository(this.getORMInstance());
    return this._automobileInstance;
  }

  driverSingleton (): IDriverRepository {
    if (this._driverInstance === undefined) this._driverInstance = new DriverRepository(this.getORMInstance());
    return this._driverInstance;
  }

  automobileUsageSingleton (): IAutomobileUsageRepository {
    if (this._automobileUsageInstance === undefined) this._automobileUsageInstance = new AutomobileUsageRepository(this.getORMInstance());
    return this._automobileUsageInstance;
  }
}

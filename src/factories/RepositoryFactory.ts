import { PrismaClient } from '@prisma/client';

import { AutomobileRepository } from '../repositories/implementations/AutomobileRepository';
import { DriverRepository } from '../repositories/implementations/DriverRepository';

export class RepositoryFactory {
  private _automobileInstance: AutomobileRepository | undefined;
  private _driverInstance: DriverRepository | undefined;
  private _prismaClient: PrismaClient | undefined;
  getORMInstance (): PrismaClient {
    if (this._prismaClient === undefined) this._prismaClient = new PrismaClient();
    return this._prismaClient;
  }

  automobileSingleton (): AutomobileRepository {
    if (this._automobileInstance === undefined) this._automobileInstance = new AutomobileRepository(this.getORMInstance());
    return this._automobileInstance;
  }

  driverSingleton (): DriverRepository {
    if (this._driverInstance === undefined) this._driverInstance = new DriverRepository(this.getORMInstance());
    return this._driverInstance;
  }
}

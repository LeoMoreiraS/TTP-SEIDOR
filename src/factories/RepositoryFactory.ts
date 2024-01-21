import Prisma from '@prisma/client';

import { AutomobileRepository } from '../repositories/implementations/AutomobileRepository';

export class RepositoryFactory {
  private _automobileInstance: AutomobileRepository | undefined;

  automobileSingleton (): AutomobileRepository {
    const { PrismaClient } = Prisma;
    if (this._automobileInstance === undefined) this._automobileInstance = new AutomobileRepository(new PrismaClient());
    return this._automobileInstance;
  }
}

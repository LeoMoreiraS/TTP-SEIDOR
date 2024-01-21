import { AutomobileController } from '../controllers/AutomobileController';
import { DriverController } from '../controllers/DriverController';
import { RepositoryFactory } from './RepositoryFactory';

export class ControllerFactory {
  private _automobileInstance: AutomobileController | undefined;
  private _driverInstance: DriverController | undefined;

  automobileSingleton (): AutomobileController {
    if (this._automobileInstance === undefined) this._automobileInstance = new AutomobileController(new RepositoryFactory().automobileSingleton());
    return this._automobileInstance;
  }

  driverSingleton (): DriverController {
    if (this._driverInstance === undefined) this._driverInstance = new DriverController(new RepositoryFactory().driverSingleton());
    return this._driverInstance;
  }
}

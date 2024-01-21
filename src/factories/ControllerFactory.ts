import { AutomobileController } from '../controllers/AutomobileController';
import { RepositoryFactory } from './RepositoryFactory';

export class ControllerFactory {
  private _automobileInstance: AutomobileController | undefined;

  automobileSingleton (): AutomobileController {
    if (this._automobileInstance === undefined) this._automobileInstance = new AutomobileController(new RepositoryFactory().automobileSingleton());
    return this._automobileInstance;
  }
}

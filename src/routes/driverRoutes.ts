import { Router } from 'express';
import { ControllerFactory } from '../factories/ControllerFactory';
const driverController = new ControllerFactory().driverSingleton();
export const driverRouter = Router();

driverRouter.get('/drivers', driverController.getDrivers.bind(driverController));

driverRouter.get('/drivers/:id', driverController.getDriverById.bind(driverController));

driverRouter.post('/drivers', driverController.createDriver.bind(driverController));

driverRouter.put('/drivers/:id', driverController.updateDriver.bind(driverController));

driverRouter.delete('/drivers/:id', driverController.deleteDriver.bind(driverController));

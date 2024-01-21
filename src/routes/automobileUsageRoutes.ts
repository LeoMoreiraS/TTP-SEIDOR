import { Router } from 'express';
import { ControllerFactory } from '../factories/ControllerFactory';

const automobilesUsageController = new ControllerFactory().automobileUsageSingleton();

export const automobilesUsageRouter = Router();

automobilesUsageRouter.get('/automobilesUsage', automobilesUsageController.getAutomobilesUsage.bind(automobilesUsageController));

automobilesUsageRouter.post('/automobilesUsage', automobilesUsageController.createAutomobileUsage.bind(automobilesUsageController));

automobilesUsageRouter.put('/automobilesUsage/:id', automobilesUsageController.updateAutomobileUsageByDriver.bind(automobilesUsageController));

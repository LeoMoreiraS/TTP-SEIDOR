import { Router } from 'express';
import { ControllerFactory } from '../factories/ControllerFactory';
const automobileController = new ControllerFactory().automobileSingleton();
export const automobileRouter = Router();

automobileRouter.get('/automobiles', automobileController.getAutomobiles.bind(automobileController));

automobileRouter.get('/automobiles/:id', automobileController.getAutomobileById.bind(automobileController));

automobileRouter.post('/automobiles', automobileController.createAutomobile.bind(automobileController));

automobileRouter.put('/automobiles/:id', automobileController.updateAutomobile.bind(automobileController));

automobileRouter.delete('/automobiles/:id', automobileController.deleteAutomobile.bind(automobileController));

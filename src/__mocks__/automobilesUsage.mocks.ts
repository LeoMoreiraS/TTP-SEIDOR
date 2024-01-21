import { mockAutomobile } from './automobiles.mocks';
import { mockDriver } from './drivers.mocks';

export const mockAutomobileUsageInput = {
  driverId: mockDriver.id,
  automobileId: mockAutomobile.id,
  purpose: 'Viagem'
};

export const mockAutomobileUsage = {
  id: 1,
  driverId: mockDriver.id,
  automobileId: mockAutomobile.id,
  startDate: new Date(),
  endDate: null,
  purpose: 'Viagem',
  Driver: mockDriver,
  Automobile: mockAutomobile
};

export const mockAutomobilesUsage = [
  {
    id: 1,
    driverId: 1,
    automobileId: 2,
    startDate: new Date(),
    endDate: null,
    purpose: 'Viagem',
    Driver: mockDriver,
    Automobile: mockAutomobile
  },
  {
    id: 2,
    driverId: 1,
    automobileId: 2,
    startDate: new Date(),
    endDate: new Date(),
    purpose: 'Entrega',
    Driver: mockDriver,
    Automobile: mockAutomobile
  }
];

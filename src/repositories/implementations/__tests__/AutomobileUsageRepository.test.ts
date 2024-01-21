import { mockAutomobileUsageInput, mockAutomobileUsage, mockAutomobilesUsage } from '../../../__mocks__/automobilesUsage.mocks';

import { prismaMock } from '../../../__mocks__/prisma.singleton';

import { AutomobileUsageRepository } from '../AutomobileUsageRepository';

describe('AutomobileUsageRepository', () => {
  let _automobileUsageRepository: AutomobileUsageRepository;

  beforeEach(() => {
    _automobileUsageRepository = new AutomobileUsageRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should import the dependencies correctly', () => {
    expect(prismaMock).not.toBeUndefined();
    expect(AutomobileUsageRepository).not.toBeUndefined();
  });

  describe('createAutomobileUsage', () => {
    it('should create an AutomobileUsage', async () => {
      prismaMock.automobileUsage.create.mockResolvedValueOnce(mockAutomobileUsage);

      const automobileUsage = await _automobileUsageRepository.createAutomobileUsage(mockAutomobileUsageInput);

      expect(prismaMock.automobileUsage.create).toHaveBeenCalledWith({
        data: {
          purpose: mockAutomobileUsageInput.purpose,
          driver: {
            connect: { id: mockAutomobileUsageInput.driverId }
          },
          automobile: {
            connect: { id: mockAutomobileUsageInput.automobileId }
          }
        }
      });
      expect(automobileUsage).toEqual(mockAutomobileUsage);
    });

    it('should return the automobileUsage if the driver is already using an automobile', async () => {
      prismaMock.automobileUsage.findFirst.mockResolvedValueOnce(mockAutomobileUsage);
      const automobileUsage = await _automobileUsageRepository.checkExistingUsageForDriver(1);

      expect(automobileUsage).toEqual(mockAutomobileUsage);
    });

    it('should return the automobileUsage if the automobile is already being used', async () => {
      prismaMock.automobileUsage.findFirst.mockResolvedValueOnce(mockAutomobileUsage);
      const automobileUsage = await _automobileUsageRepository.checkExistingUsageForAutomobile(1);

      expect(automobileUsage).toEqual(mockAutomobileUsage);
    });

    it('should return null if the driver is not using an automobile', async () => {
      prismaMock.automobileUsage.findFirst.mockResolvedValueOnce(null);
      const automobileUsage = await _automobileUsageRepository.checkExistingUsageForDriver(4);

      expect(automobileUsage).toEqual(null);
    });

    it('should return null if the automobile is not being used', async () => {
      prismaMock.automobileUsage.findFirst.mockResolvedValueOnce(null);
      const automobileUsage = await _automobileUsageRepository.checkExistingUsageForAutomobile(4);

      expect(automobileUsage).toEqual(null);
    });
  });

  describe('endAutomobileUsage', () => {
    it('should update the endDate of an automobile usage', async () => {
      const updatedMockUsage = Object.assign(mockAutomobileUsage, { endDate: new Date() });
      prismaMock.automobileUsage.update.mockResolvedValueOnce(updatedMockUsage);

      const updatedUsage = await _automobileUsageRepository.endAutomobileUsage(1);

      expect(prismaMock.automobileUsage.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { endDate: expect.any(Date) }
      });
      expect(updatedUsage).toEqual(updatedMockUsage);
    });
  });

  describe('listAutomobileUsages', () => {
    it('should return a list of automobile usages with driver and automobile information', async () => {
      prismaMock.automobileUsage.findMany.mockResolvedValueOnce(mockAutomobilesUsage);

      const usages = await _automobileUsageRepository.listAutomobileUsages();

      expect(prismaMock.automobileUsage.findMany).toHaveBeenCalledWith({
        include: { driver: true, automobile: true }
      });
      expect(usages).toEqual(mockAutomobilesUsage);
    });
  });
});

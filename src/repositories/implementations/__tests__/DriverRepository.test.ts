import { mockDriver, mockDriverInput, mockDrivers } from '../../../__mocks__/drivers.mocks';
import { prismaMock } from '../../../__mocks__/prisma.singleton';

import { DriverRepository } from '../DriverRepository';

describe('DriverRepository', () => {
  let _DriverRepository: DriverRepository;

  beforeEach(() => {
    _DriverRepository = new DriverRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should import the dependencies correctly', () => {
    expect(prismaMock).not.toBeUndefined();
    expect(DriverRepository).not.toBeUndefined();
  });

  describe('createDriver', () => {
    it('should create an Driver', async () => {
      prismaMock.driver.create.mockResolvedValueOnce(mockDriver);

      const Driver = await _DriverRepository.createDriver(mockDriverInput);

      expect(prismaMock.driver.create).toHaveBeenCalledWith({ data: { ...mockDriverInput } });
      expect(Driver).toEqual(mockDriver);
    });
  });

  describe('findAllDrivers', () => {
    it('should return an empty array if there are no Drivers', async () => {
      prismaMock.driver.findMany.mockResolvedValue([]);

      const Drivers = await _DriverRepository.findAllDrivers();

      expect(Drivers).toEqual([]);
    });

    it('should return all Drivers', async () => {
      prismaMock.driver.findMany.mockResolvedValue(mockDrivers);

      const foundDrivers = await _DriverRepository.findAllDrivers();

      expect(foundDrivers).toEqual(mockDrivers);
    });
  });

  describe('findDriverById', () => {
    it('should return the Driver if found', async () => {
      prismaMock.driver.findUnique.mockResolvedValue(mockDriver);

      const Driver = await _DriverRepository.findDriverById(1);

      expect(Driver).toEqual(mockDriver);
    });

    it('should return null if the Driver is not found', async () => {
      prismaMock.driver.findUnique.mockResolvedValue(null);

      const Driver = await _DriverRepository.findDriverById(2);

      expect(Driver).toBeNull();
    });
  });

  describe('updateDriver', () => {
    it('should update the Driver if found', async () => {
      prismaMock.driver.update.mockResolvedValue(mockDriver);

      const updatedDriver = await _DriverRepository.updateDriver(1, mockDriverInput);

      expect(prismaMock.driver.update).toHaveBeenCalledWith({ data: mockDriverInput, where: { id: 1 } });
      expect(updatedDriver).toEqual(mockDriver);
    });
  });

  describe('deleteDriver', () => {
    it('should delete the Driver if found', async () => {
      prismaMock.driver.delete.mockResolvedValue(mockDriver);

      const deletedDriver = await _DriverRepository.deleteDriver(1);

      expect(prismaMock.driver.delete).toHaveBeenCalledWith({
        where: {
          id: 1
        }
      });
      expect(deletedDriver).toEqual(mockDriver);
    });
  });
});

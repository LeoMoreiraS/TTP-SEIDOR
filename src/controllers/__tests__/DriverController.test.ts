import { mockDriver, mockDriverInput, mockDrivers } from '../../__mocks__/drivers.mocks';
import { mockReq, mockRes } from '../../__mocks__/express.mocks';
import type { IDriverRepository } from '../../repositories/IDriverRepository';
import { DriverController } from '../DriverController';
import { type Request, type Response } from 'express';
import { mockDeep } from 'jest-mock-extended';

describe('DriverController', () => {
  let _DriverController: DriverController;
  const _DriverRepository = mockDeep<IDriverRepository>();

  beforeEach(() => {
    _DriverController = new DriverController(_DriverRepository);
  });
  describe('findAllDrivers', () => {
    test('should find all Drivers', async () => {
      _DriverRepository.findAllDrivers.mockResolvedValueOnce(mockDrivers);

      await _DriverController.getDrivers(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockDrivers);
    });

    test('should handle errors from repository', async () => {
      const mockError = new Error('Error fetching Drivers');
      _DriverRepository.findAllDrivers.mockRejectedValueOnce(mockError);

      await _DriverController.getDrivers(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Error fetching Drivers' } });
    });
  });

  describe('getDriverById', () => {
    test('should get an existing Driver by id', async () => {
      _DriverRepository.findDriverById.mockResolvedValueOnce(mockDriver);

      mockReq.params = { id: '1' };

      await _DriverController.getDriverById(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockDriver);
    });

    test('should throw a error if id is invalid', async () => {
      mockReq.params = { id: 'invalid id' };

      await _DriverController.getDriverById(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Invalid id' } });
    });

    test('should throw a error if id is invalid', async () => {
      mockReq.params = { id: undefined as unknown as string };
      await _DriverController.getDriverById(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Missing required parameter: id' } });
    });

    test('should return 404 when Driver not found', async () => {
      _DriverRepository.findDriverById.mockResolvedValueOnce(null);

      mockReq.params = { id: '1' };

      await _DriverController.getDriverById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Driver not found' } });
    });

    test('should handle errors from repository', async () => {
      const mockError = new Error('Error finding Driver');
      _DriverRepository.findDriverById.mockRejectedValueOnce(mockError);
      mockReq.params = { id: '1' };

      await _DriverController.getDriverById(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Error finding Driver' } });
    });
  });

  describe('createDriver', () => {
    test('should create a new Driver', async () => {
      _DriverRepository.createDriver.mockResolvedValueOnce(mockDriver);
      mockReq.body = mockDriverInput;
      await _DriverController.createDriver(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        ...mockDriver
      });
    });

    test('should throw a error when missing a field', async () => {
      mockReq.body = {};

      await _DriverController.createDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Missing required fields in request body' } });
    });

    test('should handle errors from repository', async () => {
      const mockError = new Error('Error creating Driver');
      _DriverRepository.createDriver.mockRejectedValueOnce(mockError);

      mockReq.body = mockDriverInput;

      await _DriverController.createDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Error creating Driver' } });
    });
  });

  describe('updateDriver', () => {
    test('should update an existing Driver', async () => {
      const mockDriverData = { name: 'Leonardo' };
      _DriverRepository.updateDriver.mockResolvedValueOnce(Object.assign(mockDriver, {
        ...mockDriverData
      }));

      Object.assign(mockReq, { params: { id: '1' }, body: mockDriverData });

      await _DriverController.updateDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(Object.assign(mockDriver, {
        ...mockDriverData
      }));
    });

    test('should return 404 when Driver not found', async () => {
      const mockDriverData = mockDriverInput;
      _DriverRepository.updateDriver.mockResolvedValueOnce(null);

      Object.assign(mockReq, { params: { id: '1' }, body: mockDriverData });

      await _DriverController.updateDriver(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Driver not found' } });
    });

    test('should throw a error if id is invalid', async () => {
      mockReq.params = { id: 'invalid id' };

      await _DriverController.updateDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Invalid id' } });
    });

    test('should throw a error when missing all fields', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = {};

      await _DriverController.updateDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Missing required fields in request body' } });
    });

    test('should handle errors from repository', async () => {
      const mockError = new Error('Error updating Driver');
      _DriverRepository.updateDriver.mockRejectedValueOnce(mockError);

      mockReq.params = { id: '1' };
      mockReq.body = mockDriverInput;

      await _DriverController.updateDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Error updating Driver' } });
    });
  });

  describe('deleteDriver', () => {
    test('should delete an existing Driver', async () => {
      _DriverRepository.deleteDriver.mockResolvedValueOnce(mockDriver);

      mockReq.params = { id: '1' };

      await _DriverController.deleteDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockDriver);
    });

    test('should throw a error if id is invalid', async () => {
      mockReq.params = { id: 'invalid id' };

      await _DriverController.deleteDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Invalid id' } });
    });

    test('should return 404 when Driver not found', async () => {
      _DriverRepository.deleteDriver.mockResolvedValueOnce(null);

      mockReq.params = { id: '1' };

      await _DriverController.deleteDriver(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Driver not found' } });
    });

    test('should handle errors from repository', async () => {
      const mockError = new Error('Error deleting Driver');
      _DriverRepository.deleteDriver.mockRejectedValueOnce(mockError);

      mockReq.params = { id: '1' };

      await _DriverController.deleteDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Error deleting Driver' } });
    });
  });
});

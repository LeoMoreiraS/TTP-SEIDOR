import { AutomobileUsageController } from '../AutomobileUsageController';
import { mockAutomobileUsage, mockAutomobileUsageInput, mockAutomobilesUsage } from '../../__mocks__/automobilesUsage.mocks';
import { mockReq, mockRes } from '../../__mocks__/express.mocks';

import { type IAutomobileUsageRepository } from '../../repositories/IAutomobileUsageRepository';
import { mockDeep } from 'jest-mock-extended';

describe('AutomobilesUsageController', () => {
  let _automobileUsageController: AutomobileUsageController;
  const _automobileUsageRepository = mockDeep<IAutomobileUsageRepository>();

  beforeEach(() => {
    _automobileUsageController = new AutomobileUsageController(_automobileUsageRepository);
  });

  it('should import the dependencies correctly', () => {
    expect(_automobileUsageRepository).not.toBeUndefined();
    expect(AutomobileUsageController).not.toBeUndefined();
  });

  describe('getAutomobilesUsage', () => {
    it('should return a list of automobile usages', async () => {
      _automobileUsageRepository.listAutomobileUsages.mockResolvedValueOnce(mockAutomobilesUsage);

      await _automobileUsageController.getAutomobilesUsage(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockAutomobilesUsage);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Database error');
      _automobileUsageRepository.listAutomobileUsages.mockRejectedValueOnce(mockError);

      await _automobileUsageController.getAutomobilesUsage(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Something unexpected happened' } });
    });
    it('should handle errors', async () => {
      const mockError = new Error('Database error');
      _automobileUsageRepository.listAutomobileUsages.mockRejectedValueOnce(mockError);

      await _automobileUsageController.getAutomobilesUsage(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Something unexpected happened' } });
    });
  });

  describe('createAutomobileUsage', () => {
    it('should return a error if missing params', async () => {
      mockReq.body = { };

      await _automobileUsageController.createAutomobileUsage(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Missing required fields in request body' } });
    });

    it('should handle existing driver usage', async () => {
      _automobileUsageRepository.checkExistingUsageForDriver.mockResolvedValueOnce(mockAutomobileUsage);

      mockReq.body = { ...mockAutomobileUsageInput };

      await _automobileUsageController.createAutomobileUsage(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Driver is already using a automobile' } });
    });

    it('should handle existing automobile usage', async () => {
      _automobileUsageRepository.checkExistingUsageForDriver.mockResolvedValueOnce(null);
      _automobileUsageRepository.checkExistingUsageForAutomobile.mockResolvedValueOnce(mockAutomobileUsage);

      mockReq.body = { ...mockAutomobileUsageInput };

      await _automobileUsageController.createAutomobileUsage(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Automobile is already in use' } });
    });

    it('should create an automobile usage', async () => {
      _automobileUsageRepository.checkExistingUsageForDriver.mockResolvedValueOnce(null);
      _automobileUsageRepository.checkExistingUsageForAutomobile.mockResolvedValueOnce(null);
      _automobileUsageRepository.createAutomobileUsage.mockResolvedValueOnce(mockAutomobileUsage);

      mockReq.body = { ...mockAutomobileUsageInput };

      await _automobileUsageController.createAutomobileUsage(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockAutomobileUsage);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Database error');
      _automobileUsageRepository.checkExistingUsageForDriver.mockRejectedValueOnce(mockError);

      await _automobileUsageController.createAutomobileUsage(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Something unexpected happened' } });
    });
  });

  describe('updateAutomobileUsageByDriver', () => {
    it('should end automobile usage for a driver', async () => {
      _automobileUsageRepository.checkExistingUsageForDriver.mockResolvedValueOnce(mockAutomobileUsage);
      _automobileUsageRepository.endAutomobileUsage.mockResolvedValueOnce(mockAutomobileUsage);

      mockReq.params = { id: '1' };
      await _automobileUsageController.updateAutomobileUsageByDriver(mockReq, mockRes);

      expect(_automobileUsageRepository.checkExistingUsageForDriver).toHaveBeenCalledWith(1);
      expect(_automobileUsageRepository.endAutomobileUsage).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith(mockAutomobileUsage);
    });

    it('should handle invalid id', async () => {
      mockReq.params = { id: 'invalid_id' };
      await _automobileUsageController.updateAutomobileUsageByDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Invalid id' } });
    });

    it('should handle non-existent usage for driver', async () => {
      _automobileUsageRepository.checkExistingUsageForDriver.mockResolvedValueOnce(null);

      mockReq.params = { id: '1' };
      await _automobileUsageController.updateAutomobileUsageByDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Driver is not currently using a automobile' } });
    });

    it('should handle errors', async () => {
      const mockError = new Error('Database error');
      _automobileUsageRepository.checkExistingUsageForDriver.mockRejectedValueOnce(mockError);

      await _automobileUsageController.updateAutomobileUsageByDriver(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Something unexpected happened' } });
    });
  });
});

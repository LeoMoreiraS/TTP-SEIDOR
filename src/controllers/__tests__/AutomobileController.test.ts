import { mockAutomobile, mockAutomobileInput, mockAutomobiles } from '../../__mocks__/automobiles.mocks';
import { mockReq, mockRes } from '../../__mocks__/express.mocks';
import type { IAutomobileRepository } from '../../repositories/IAutomobileRepository';
import { AutomobileController } from '../AutomobileController';
import { type Request, type Response } from 'express';
import { mockDeep } from 'jest-mock-extended';

describe('AutomobileController', () => {
  let _automobileController: AutomobileController;
  const _automobileRepository = mockDeep<IAutomobileRepository>();

  beforeEach(() => {
    _automobileController = new AutomobileController(_automobileRepository);
  });
  describe('findAllAutomobiles', () => {
    test('should find all automobiles', async () => {
      _automobileRepository.findAllAutomobiles.mockResolvedValueOnce(mockAutomobiles);

      await _automobileController.getAutomobiles(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockAutomobiles);
    });

    test('should handle errors from repository', async () => {
      const mockError = new Error('Error fetching automobiles');
      _automobileRepository.findAllAutomobiles.mockRejectedValueOnce(mockError);

      await _automobileController.getAutomobiles(mockReq, mockRes);

      mockRes.json({ error: { message: 'Error fetching automobiles' } });
    });
  });

  describe('getAutomobileById', () => {
    test('should get an existing automobile by id', async () => {
      _automobileRepository.findAutomobileById.mockResolvedValueOnce(mockAutomobile);

      mockReq.params = { id: '1' };

      await _automobileController.getAutomobileById(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockAutomobile);
    });

    test('should throw a error if id is invalid', async () => {
      mockReq.params = { id: 'invalid id' };

      await _automobileController.getAutomobileById(mockReq, mockRes);

      mockRes.json({ error: { message: 'Invalid id' } });
    });

    test('should throw a error if id is undefined', async () => {
      mockReq.params = { id: undefined as unknown as string };
      await _automobileController.getAutomobileById(mockReq, mockRes);
      mockRes.json({ error: { message: 'Missing required parameter: id' } });
    });

    test('should return 404 when automobile not found', async () => {
      _automobileRepository.findAutomobileById.mockResolvedValueOnce(null);

      mockReq.params = { id: '1' };

      await _automobileController.getAutomobileById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Automobile not found' } });
    });

    test('should handle errors from repository', async () => {
      const mockError = new Error('Error finding automobile');
      _automobileRepository.findAutomobileById.mockRejectedValueOnce(mockError);
      mockReq.params = { id: '1' };

      await _automobileController.getAutomobileById(mockReq, mockRes);
      mockRes.json({ error: { message: 'Error finding automobile' } });
    });
  });

  describe('createAutomobile', () => {
    test('should create a new automobile', async () => {
      _automobileRepository.createAutomobile.mockResolvedValueOnce(mockAutomobile);
      mockReq.body = mockAutomobileInput;
      await _automobileController.createAutomobile(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        ...mockAutomobile
      });
    });

    test('should return a error when missing a field', async () => {
      mockReq.body = {};

      await _automobileController.createAutomobile(mockReq, mockRes);
      mockRes.json({ error: { message: 'Missing required fields in request body' } });
    });

    test('should handle errors from repository', async () => {
      const mockError = new Error('Error creating automobile');
      _automobileRepository.createAutomobile.mockRejectedValueOnce(mockError);

      mockReq.body = mockAutomobileInput;

      await _automobileController.createAutomobile(mockReq, mockRes);
      mockRes.json({ error: { message: 'Error creating automobile' } });
    });
  });

  describe('updateAutomobile', () => {
    test('should update an existing automobile', async () => {
      const mockAutomobileData = { color: 'vermelho', brand: 'Volkswagen' };
      _automobileRepository.updateAutomobile.mockResolvedValueOnce(Object.assign(mockAutomobile, {
        ...mockAutomobileData
      }));

      Object.assign(mockReq, { params: { id: '1' }, body: mockAutomobileData });

      await _automobileController.updateAutomobile(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(Object.assign(mockAutomobile, {
        ...mockAutomobileData
      }));
    });

    test('should return 404 when automobile not found', async () => {
      const mockAutomobileData = { color: 'vermelho', brand: 'Volkswagen' };
      _automobileRepository.updateAutomobile.mockResolvedValueOnce(null);

      Object.assign(mockReq, { params: { id: '1' }, body: mockAutomobileData });

      await _automobileController.updateAutomobile(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Automobile not found' } });
    });

    test('should throw a error if id is invalid', async () => {
      mockReq.params = { id: 'invalid id' };

      await _automobileController.updateAutomobile(mockReq, mockRes);
      mockRes.json({ error: { message: 'Invalid id' } });
    });

    test('should throw a error when missing all fields', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = {};

      await _automobileController.updateAutomobile(mockReq, mockRes);

      mockRes.json({ error: { message: 'Missing required fields in request body' } });
    });

    test('should handle errors from repository', async () => {
      const mockError = new Error('Error updating automobile');
      _automobileRepository.updateAutomobile.mockRejectedValueOnce(mockError);

      mockReq.body = mockAutomobileInput;
      await _automobileController.updateAutomobile(mockReq, mockRes);
      mockRes.json({ error: { message: 'Missing required parameter: id' } });
    });
  });

  describe('deleteAutomobile', () => {
    test('should delete an existing automobile', async () => {
      _automobileRepository.deleteAutomobile.mockResolvedValueOnce(mockAutomobile);

      mockReq.params = { id: '1' };

      await _automobileController.deleteAutomobile(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockAutomobile);
    });

    test('should return a error if id is invalid', async () => {
      mockReq.params = { id: 'invalid id' };

      await _automobileController.deleteAutomobile(mockReq, mockRes);

      mockRes.json({ error: { message: 'Invalid id' } });
    });

    test('should return 404 when automobile not found', async () => {
      _automobileRepository.deleteAutomobile.mockResolvedValueOnce(null);

      mockReq.params = { id: '1' };

      await _automobileController.deleteAutomobile(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Automobile not found' } });
    });

    test('should handle errors from repository', async () => {
      const mockError = new Error('Error deleting automobile');
      _automobileRepository.deleteAutomobile.mockRejectedValueOnce(mockError);

      mockReq.params = { id: '1' };

      await _automobileController.deleteAutomobile(mockReq, mockRes);
      mockRes.json({ error: { message: 'Error deleting automobile' } });
    });
  });
});

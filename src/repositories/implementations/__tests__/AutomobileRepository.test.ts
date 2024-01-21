import { mockAutomobile, mockAutomobileInput, mockAutomobiles } from '../../../__mocks__/automobiles.mocks';
import { prismaMock } from '../../../__mocks__/prisma.singleton';

import { AutomobileRepository } from '../AutomobileRepository';

describe('AutomobileRepository', () => {
  let _automobileRepository: AutomobileRepository;

  beforeEach(() => {
    _automobileRepository = new AutomobileRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should import the dependencies correctly', () => {
    expect(prismaMock).not.toBeUndefined();
    expect(AutomobileRepository).not.toBeUndefined();
  });

  describe('createAutomobile', () => {
    it('should create an automobile', async () => {
      prismaMock.automobile.create.mockResolvedValueOnce(mockAutomobile);

      const automobile = await _automobileRepository.createAutomobile(mockAutomobileInput);

      expect(prismaMock.automobile.create).toHaveBeenCalledWith({ data: { ...mockAutomobileInput } });
      expect(automobile).toEqual(mockAutomobile);
    });
  });

  describe('findAllAutomobiles', () => {
    it('should return an empty array if there are no automobiles', async () => {
      prismaMock.automobile.findMany.mockResolvedValue([]);

      const automobiles = await _automobileRepository.findAllAutomobiles({});
      expect(prismaMock.automobile.findMany).toHaveBeenCalledWith({ where: {} });
      expect(automobiles).toEqual([]);
    });

    it('should return all automobiles', async () => {
      prismaMock.automobile.findMany.mockResolvedValue(mockAutomobiles);

      const foundAutomobiles = await _automobileRepository.findAllAutomobiles({});

      expect(foundAutomobiles).toEqual(mockAutomobiles);
    });

    it('should return all automobiles filtered by brand', async () => {
      prismaMock.automobile.findMany.mockResolvedValue([mockAutomobiles[1]]);

      const foundAutomobiles = await _automobileRepository.findAllAutomobiles({ brand: 'Renault' });
      expect(prismaMock.automobile.findMany).toHaveBeenCalledWith({ where: { brand: { equals: 'Renault' } } });
      expect(foundAutomobiles).toEqual([mockAutomobiles[1]]);
    });

    it('should return all automobiles filtered by color', async () => {
      prismaMock.automobile.findMany.mockResolvedValue([mockAutomobile]);

      const foundAutomobiles = await _automobileRepository.findAllAutomobiles({ color: 'vermelho' });

      expect(prismaMock.automobile.findMany).toHaveBeenCalledWith({ where: { color: { equals: 'vermelho' } } });

      expect(foundAutomobiles).toEqual([mockAutomobile]);
    });
  });

  describe('findAutomobileById', () => {
    it('should return the automobile if found', async () => {
      prismaMock.automobile.findUnique.mockResolvedValue(mockAutomobile);

      const automobile = await _automobileRepository.findAutomobileById(1);

      expect(automobile).toEqual(mockAutomobile);
    });

    it('should return null if the automobile is not found', async () => {
      prismaMock.automobile.findUnique.mockResolvedValue(null);

      const automobile = await _automobileRepository.findAutomobileById(2);

      expect(automobile).toBeNull();
    });
  });

  describe('updateAutomobile', () => {
    it('should update the automobile if found', async () => {
      prismaMock.automobile.update.mockResolvedValue(mockAutomobile);

      const updatedAutomobile = await _automobileRepository.updateAutomobile(1, mockAutomobileInput);

      expect(prismaMock.automobile.update).toHaveBeenCalledWith({ data: mockAutomobileInput, where: { id: 1 } });

      expect(updatedAutomobile).toEqual(mockAutomobile);
    });
  });

  describe('deleteAutomobile', () => {
    it('should delete the automobile if found', async () => {
      prismaMock.automobile.delete.mockResolvedValue(mockAutomobile);

      const deletedAutomobile = await _automobileRepository.deleteAutomobile(1);

      expect(prismaMock.automobile.delete).toHaveBeenCalledWith({
        where: {
          id: 1
        }
      });
      expect(deletedAutomobile).toEqual(mockAutomobile);
    });
  });
});

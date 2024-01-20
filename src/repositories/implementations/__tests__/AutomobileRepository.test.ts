import { prismaMock } from '../../../prisma/__tests__/prisma.singleton';
import AutomobileRepository from '../AutomobileRepository';

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
      const data = { plate: 'LVZ-6342', color: 'vermelho', brand: 'Fiat' };
      const expectedAutomobile = { id: 1, ...data };

      prismaMock.automobile.create.mockResolvedValueOnce(expectedAutomobile);

      const automobile = await _automobileRepository.createAutomobile(data);

      expect(prismaMock.automobile.create).toHaveBeenCalledWith({ data });
      expect(automobile).toEqual(expectedAutomobile);
    });
  });

  describe('findAllAutomobiles', () => {
    it('should return an empty array if there are no automobiles', async () => {
      prismaMock.automobile.findMany.mockResolvedValue([]);

      const automobiles = await _automobileRepository.findAllAutomobiles();

      expect(automobiles).toEqual([]);
    });

    it('should return all automobiles', async () => {
      const automobiles = [
        { id: 1, plate: 'LVZ-6342', color: 'red', brand: 'Honda' },
        { id: 2, plate: 'XYZ-3454', color: 'blue', brand: 'Toyota' }
      ];
      prismaMock.automobile.findMany.mockResolvedValue(automobiles);

      const foundAutomobiles = await _automobileRepository.findAllAutomobiles();

      expect(foundAutomobiles).toEqual(automobiles);
    });
  });

  describe('findAutomobileById', () => {
    it('should return the automobile if found', async () => {
      const expectedAutomobile = { id: 1, plate: 'LVZ-6342', color: 'red', brand: 'Honda' };
      prismaMock.automobile.findUnique.mockResolvedValue(expectedAutomobile);

      const automobile = await _automobileRepository.findAutomobileById(1);

      expect(automobile).toEqual(expectedAutomobile);
    });

    it('should return null if the automobile is not found', async () => {
      prismaMock.automobile.findUnique.mockResolvedValue(null);

      const automobile = await _automobileRepository.findAutomobileById(2);

      expect(automobile).toBeNull();
    });
  });

  describe('updateAutomobile', () => {
    it('should update the automobile if found', async () => {
      const data = { plate: 'DEF-456', color: 'blue', brand: 'Toyota' };
      const expectedAutomobile = { id: 1, ...data };
      prismaMock.automobile.update.mockResolvedValue(expectedAutomobile);

      const updatedAutomobile = await _automobileRepository.updateAutomobile(1, data);

      expect(prismaMock.automobile.update).toHaveBeenCalledWith({ data: { brand: 'Toyota', color: 'blue', plate: 'DEF-456' }, where: { id: 1 } });
      expect(updatedAutomobile).toEqual(expectedAutomobile);
    });
  });

  describe('deleteAutomobile', () => {
    it('should delete the automobile if found', async () => {
      const automobile = { id: 1, plate: 'ABC123', color: 'red', brand: 'Honda' };
      prismaMock.automobile.delete.mockResolvedValue(automobile);

      const deletedAutomobile = await _automobileRepository.deleteAutomobile(1);

      expect(prismaMock.automobile.delete).toHaveBeenCalledWith({
        where: {
          id: 1
        }
      });
      expect(deletedAutomobile).toEqual(automobile);
    });
  });
});

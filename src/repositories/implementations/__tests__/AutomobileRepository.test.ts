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
});

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
});

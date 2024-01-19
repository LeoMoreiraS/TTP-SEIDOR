import express, { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

app.get('/', async (req: Request, res: Response): Promise<void> => {
  const driver = await prisma.driver.create({
    data: {
      name: 'Leonardo'
    }
  });
  const automobile = await prisma.automobile.create({
    data: {
      brand: 'Fiat uno',
      color: 'Vermelho',
      plate: 'HAT-6440'
    }
  });
  const automobileUsage = await prisma.automobileUsage.create({
    data: {
      purpose: 'Viagem',
      automobile: {
        connect: {
          id: automobile.id
        }
      },
      driver: {
        connect: {
          id: driver.id
        }
      }
    }
  });

  res.json(automobileUsage);
});

export default app;

import express from 'express';

import { automobileRouter } from './routes/automobileRoutes';
import { driverRouter } from './routes/driverRoutes';
import { automobilesUsageRouter } from './routes/automobileUsageRoutes';

const app = express();

app.use(express.json());

app.use(automobileRouter);
app.use(driverRouter);
app.use(automobilesUsageRouter);

export default app;

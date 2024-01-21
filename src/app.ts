import express from 'express';

import { automobileRouter } from './routes/automobileRoutes';
import { driverRouter } from './routes/driverRoutes';

const app = express();

app.use(express.json());

app.use(automobileRouter);
app.use(driverRouter);

export default app;

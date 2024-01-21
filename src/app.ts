import express from 'express';

import { automobileRouter } from './routes/automobileRoutes';

const app = express();

app.use(express.json());

app.use(automobileRouter);

export default app;

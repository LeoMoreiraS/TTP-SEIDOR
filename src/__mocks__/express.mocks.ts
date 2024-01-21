import { type Request, type Response } from 'express';
export const mockRes: Response = {
  json: jest.fn(),
  status: jest.fn(() => mockRes)
} as unknown as Response;

export const mockReq: Request = {} as Request;

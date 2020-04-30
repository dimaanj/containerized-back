import express from 'express';
import { PoolClient } from 'pg';

type Request = {
  isAuth: boolean;
  userId: string;
} & express.Request;

type ContextType = {
  request: Request;
  response: express.Response;
  poolClient: PoolClient;
};

export { Request, ContextType };

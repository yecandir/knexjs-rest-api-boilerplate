import '../src/types';
import app from '../src/server';
import supertest from 'supertest';
import { config } from 'dotenv';
config();

export const request = supertest(app);

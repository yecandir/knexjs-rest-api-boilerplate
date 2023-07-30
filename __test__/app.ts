import app from '../src/server';
import supertest from 'supertest';

export const request = supertest(app);

import { Connection } from 'typeorm';
import { connection as initializeDatabase } from '../config/database';

let connection: Connection;

beforeAll(async () => {
    connection = await initializeDatabase();
});

afterAll(async () => {
    await connection.close();
});

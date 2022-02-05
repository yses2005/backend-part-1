import { createConnection } from "typeorm";
import * as Entities from '@models';

export const connection = () => createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3300,
    synchronize: true,
    logging: false,
    dropSchema: false,

    // You should never store these sensitive information in the repository but
    // for simplicity's sake, let's keep these here.
    username: 'testdb',
    password: 'testdb',
    database: 'testdb',

    entities: [...Object.values(Entities)],
});

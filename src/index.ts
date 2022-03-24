import { connection } from './config/database';

const main = async () => {
    await connection();
    console.log('ready');
}

main();

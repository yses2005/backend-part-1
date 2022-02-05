import { Order, User } from '@models';
import { EntityManager, getManager } from 'typeorm';

describe('Order', () => {
    let manager: EntityManager;

    beforeAll(async () => {
        manager = getManager();

        const queries = [
            `INSERT INTO user (username) VALUES ('user1'), ('user2'), ('user3')`,
            `
                INSERT INTO
                    item (name, price, stocks)
                VALUES
                    ('Item 1', 10, 2),
                    ('Item 2', 2.5, 10),
                    ('Item 3', 11.25, 3)
            `,
            `INSERT INTO \`order\` (customerId) VALUES (1), (1), (2)`,
        ];

        for (const query of queries) {
            await manager.query(query);
        }
    });

    describe('Get all orders from user ID', () => {
        let orders: Order[];

        beforeAll(async () => {
            // TODO: Query all orders from user id 1
        });

        it('should return all orders', () => {
            expect(orders).toHaveLength(2);
        });

        it('should return only orders from user ID 1', () => {
            const isAllFromUser = orders.every(order => order.customerId === 1);
            expect(isAllFromUser).toBeTruthy();
        });
    });

    describe('Create an order for user', () => {
        let order: Order;

        beforeAll(async () => {
            // TODO: Create a new order for `user2`
        });

        it('should have foreign key of customer', () => {
            expect(order.customerId).toBe(2);
        });

        it('should be persisted under the user\'s orders', async () => {
            const [result] = await manager.query(`
                SELECT COUNT(*) AS count
                FROM \`order\`
                WHERE customerId = 2
                GROUP BY customerId
            `);

            expect(+result.count).toBe(2);
        });
    });

    describe('Delete an order from user', () => {
        let order: Order;

        beforeAll(async () => {
            // TODO: Delete user1's first order (HINT: You can check `createdAt` field)
        });

        it('should delete the first order', () => {
            expect(order.id).toBe(1);
            expect(order.deleted).toBeTruthy();
        });

        it('should not be returned when queried', async () => {
            const result = await manager.query(`
                SELECT *
                FROM \`order\`
                WHERE
                    customerId = 1
                    AND deleted IS NOT NULL
            `);

            expect(result).toHaveLength(1);
        });

        it('should still be persisted in the database', async () => {
            const [result] = await manager.query(`
                SELECT *
                FROM \`order\`
                WHERE id = 1 AND customerId = 1
            `);

            expect(result).toBeDefined();
        });
    });

    describe('Get number of orders of a specific user', () => {
        let orderCount: number;

        beforeAll(async () => {
            // TODO: Get the total number of orders of user3
        });

        it('should count the non-deleted orders', () => {
            expect(orderCount).toBe(0);
        });
    });

    afterAll(async () => {
        const tables = ['order', 'item', 'user'];

        for (const table of tables) {
            await manager.query(`DELETE FROM \`${table}\``);
            await manager.query(`ALTER TABLE \`${table}\` AUTO_INCREMENT = 1`);
        }
    });
});

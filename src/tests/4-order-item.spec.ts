import { Item, Order, User } from '@models';
import { EntityManager, getManager } from 'typeorm';

describe('OrderItem', () => {
    let manager: EntityManager;

    beforeAll(async () => {
        manager = getManager();

        const queries = [
            `INSERT INTO user (username) VALUES ('user1'), ('user2')`,
            `
                INSERT INTO
                    item (name, price, stocks)
                VALUES
                    ('Item 1', 10, 2),
                    ('Item 2', 2.5, 10),
                    ('Item 3', 11.25, 3)
            `,
            `INSERT INTO \`order\` (customerId) VALUES (1), (1), (2)`,
            `
                INSERT INTO
                    order_items_item (orderId, itemId)
                VALUES
                    (1, 1), (1, 2), (1, 3),
                    (2, 1), (2, 2),
                    (3, 2)
            `
        ];

        for (const query of queries) {
            await manager.query(query);
        }
    });

    describe('Order item for user', () => {
        let order: Order;

        beforeAll(async () => {
            // TODO: Order `Item 3` for `user2`
        });

        it('should have an order created', () => {
            expect(order.customerId).toBe(2);
        });

        it('should be persisted in the database', async () => {
            const [result] = await manager.query(`
                SELECT
                    o.customerId,
                    oi.itemId
                FROM \`order\` o
                LEFT JOIN order_items_item oi
                    ON o.id = oi.orderId
                WHERE o.customerId = 2 AND oi.itemId = 3
                LIMIT 1
            `);

            expect(result?.customerId).toBe(2);
            expect(result?.itemId).toBe(3);
        });
    });

    afterAll(async () => {
        const tables = ['order_items_item', 'order', 'item', 'user'];

        for (const table of tables) {
            await manager.query(`DELETE FROM \`${table}\``);
            await manager.query(`ALTER TABLE \`${table}\` AUTO_INCREMENT = 1`);
        }
    });
});

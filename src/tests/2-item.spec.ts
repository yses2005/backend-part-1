import { Item } from '@models';
import { EntityManager, getManager } from 'typeorm';

describe('Item', () => {
    let manager: EntityManager;

    beforeAll(async () => {
        manager = getManager();

        const query = `
            INSERT INTO item (name, price, stocks) VALUES
                ('Item 1', 5.0, 5),
                ('Item 2', 10.5, 2),
                ('Item 3', 2.3, 10)
        `;

        await manager.query(query);
    });

    describe('Get all items', () => {
        let items: readonly Item[];

        beforeAll(async () => {
            // TODO: Perform query here for getting all items
        });

        it('should return all items', () => {
            expect(items).toHaveLength(3);
        });
    });

    describe('Create a new item', () => {
        let item: Item;

        beforeAll(async () => {
            // TODO: Create a new item with the following details:
            // NAME: Choco Butternut
            // PRICE: 25
            // STOCKS: 10
        });

        it('should be able to create a new item', () => {
            expect(item.name).toBe('Choco Butternut');
            expect(item.price).toBe(25);
            expect(item.stocks).toBe(10);
        });

        it('should be persisted in the database', async () => {
            const [result] = await manager.query(`
                SELECT *
                FROM item
                WHERE name = 'Choco Butternut'
                LIMIT 1
            `);

            expect(result?.name).toBe('Choco Butternut');
        });
    });

    describe('Update item', () => {
        let item: Item;

        beforeAll(async () => {
            // TODO: Reduce Choco Butternut's stocks to have only 5
        });

        it('should update the data', () => {
            expect(item.stocks).toBe(5);
        });

        it('should be persisted in the database', async () => {
            const [result] = await manager.query(`
                SELECT *
                FROM item
                WHERE name = 'Choco Butternut'
                LIMIT 1
            `);

            expect(result?.stocks).toBe(5);
            expect(result?.updatedAt).not.toBe(result?.createdAt);
        });
    });

    describe('Soft-delete item', () => {
        let item: Item;

        beforeAll(async () => {
            // TODO: Soft-delete item with name `Item 1`
        });

        it('should have `deleted` field toggled', () => {
            expect(item.deleted).toBeTruthy();
        });

        it('should not be returned when queried', async () => {
            const result = await manager.query(`
                SELECT *
                FROM item
                WHERE
                    name = 'Item 1'
                    AND deleted IS NULL
            `);

            expect(result).toHaveLength(0);
        });

        it('should still be stored in the database', async () => {
            const [result] = await manager.query(`
                SELECT *
                FROM item
                WHERE name = 'Item 1'
                LIMIT 1
            `);

            expect(result?.name).toBe('Item 1');
        });
    });

    afterAll(async () => {
        await manager.query('DELETE FROM item');
        await manager.query('ALTER TABLE item AUTO_INCREMENT = 1');
    });
});

import { User } from '@models';
import { EntityManager, getManager } from 'typeorm';

describe('User', () => {
    let manager: EntityManager;

    beforeAll(async () => {
        manager = getManager();

        const query = `
            INSERT INTO user (username) VALUES
                ('user1'),
                ('user2')
        `;

        await manager.query(query);
    });

    describe('Get all users', () => {
        let users: readonly User[];

        beforeAll(async () => {
            // TODO: Perform query here for getting all users
        });

        it('should return all users', () => {
            expect(users).toHaveLength(2);
        });
    });

    describe('Create a new user', () => {
        let user: User;

        beforeAll(async () => {
            // TODO: Create a new user with username `sampleuser`
        });

        it('should be able to create a new user', () => {
            expect(user.username).toBe('sampleuser');
        });

        it('should be persisted in the database', async () => {
            const [result] = await manager.query(`
                SELECT *
                FROM user
                WHERE username = 'sampleuser'
                LIMIT 1
            `);

            expect(result?.username).toBe('sampleuser');
        });
    });

    describe('Update user', () => {
        let user: User;

        beforeAll(async () => {
            // TODO: Update user1's username to be `yses2005`
        });

        it('should update the data', () => {
            expect(user.username).toBe('yses2005');
        });

        it('should be persisted in the database', async () => {
            const [result] = await manager.query(`
                SELECT *
                FROM user
                WHERE username = 'yses2005'
                LIMIT 1
            `);

            expect(result?.username).toBe('yses2005');
            expect(result?.updatedAt).not.toBe(result?.createdAt);
        });
    });

    describe('Soft-delete user', () => {
        let user: User;

        beforeAll(async () => {
            // TODO: Soft-delete user with username `user2`
        });

        it('should have `deleted` field toggled', () => {
            expect(user.deleted).toBeTruthy();
        });

        it('should not be returned when queried', async () => {
            const result = await manager.query(`
                SELECT *
                FROM user
                WHERE
                    username = 'user2'
                    AND deleted IS NULL
            `);

            expect(result).toHaveLength(0);
        });

        it('should still be stored in the database', async () => {
            const [result] = await manager.query(`
                SELECT *
                FROM user
                WHERE username = 'user2'
                LIMIT 1
            `);

            expect(result?.username).toBe('user2');
        });
    });

    afterAll(async () => {
        await manager.query('DELETE FROM user');
        await manager.query('ALTER TABLE user AUTO_INCREMENT = 1');
    });
});

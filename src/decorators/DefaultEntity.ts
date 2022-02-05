import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    ValueTransformer,
} from 'typeorm';

const deleteDateTransformer: ValueTransformer = {
    to: date => date,
    from: value => !value,
}

export class DefaultEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * TypeORM uses deleted timestamp column to identify if the entity has been
     * soft-deleted. For simplicity, we transform it to a boolean value of true/false
     * instead.
     */
    @DeleteDateColumn({ transformer: deleteDateTransformer })
    deleted: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeInsert()
    updateDateCreation() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    updateDateUpdate() {
        this.updatedAt = new Date();
    }
}

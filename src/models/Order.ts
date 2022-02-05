import { DefaultEntity } from '@decorators';
import { Item, User } from '@models';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Order extends DefaultEntity {
    @Column('int')
    customerId: number;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'customerId' })
    customer: User;

    @ManyToMany(() => Item)
    @JoinTable()
    items: Item[];
}

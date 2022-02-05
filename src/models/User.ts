import { DefaultEntity } from '@decorators';
import { Order } from '@models';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends DefaultEntity {
    @Column()
    username: string;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];
}

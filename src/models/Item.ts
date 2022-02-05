import { DefaultEntity } from '@decorators';
import { Column, Entity } from 'typeorm';

@Entity()
export class Item extends DefaultEntity {
    @Column()
    name: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ default: 0 })
    stocks: number;
}

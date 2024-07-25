import OrderEntity from '@domain/order/entities/Order'
import { Exclude } from 'class-transformer'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'product' })
export default class ProductEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	type: string

	@Column()
	length: number

	@Column()
	width: number

	@Column()
	height: number

	@Column()
	weight: number

	@Column({ name: 'order_id' })
	@Exclude()
	orderId: string

	@ManyToOne(() => OrderEntity, (order) => order.items, { eager: false, cascade: true })
	@JoinColumn({ name: 'order_id' })
    order: OrderEntity
}

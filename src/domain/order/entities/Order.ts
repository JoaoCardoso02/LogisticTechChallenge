import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'order' })
export default class OrderEntity {
	@PrimaryGeneratedColumn()
	id: string

	@Column()
	type: string

	@Column()
	weight: number

	@Column({ name: 'origin_id' })
	originId: number

	@Column({ name: 'destination_id' })
	destinationId: number
}

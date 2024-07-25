import LocationEntity from '@domain/location/entities/Location'
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'order' })
export default class OrderEntity {
	@PrimaryGeneratedColumn()
	id: string

	@Column()
	type: string

	@Column()
	weight: number

	@Column({ name: 'origin_id' })
	@Exclude()
	originId: string;

	@OneToOne(() => LocationEntity, (location) => location.id)
	@JoinColumn({ name: 'origin_id' })
	origin: LocationEntity

	@Column({ name: 'destination_id' })
	@Exclude()
	destinationId: string;

	@OneToOne(() => LocationEntity, (location) => location.id)
	@JoinColumn({ name: 'destination_id' })
	destination: LocationEntity
}

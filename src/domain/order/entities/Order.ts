import LocationEntity from '@domain/location/entities/Location'
import ProductEntity from '@domain/product/entities/Product';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'order' })
export default class OrderEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	type: string

	@Column({ nullable: true })
	weight: number

	@Column({ name: 'origin_id' })
	@Exclude()
	originId: string;

	@OneToOne(() => LocationEntity, (location) => location.id)
	@JoinColumn({ name: 'origin_id' })
	pickup: LocationEntity

	@Column({ name: 'destination_id' })
	@Exclude()
	destinationId: string;

	@OneToOne(() => LocationEntity, (location) => location.id)
	@JoinColumn({ name: 'destination_id' })
	destination: LocationEntity

	@OneToMany(() => ProductEntity, (product) => product.order, { eager: true })
	items: ProductEntity[]

	@Column({ type: String, name: 'external_id', nullable: true, unique: true })
	externalId: string | null
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'location' })
export default class LocationEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	address: string

	@Column({ name: 'contact_name' })
	contactName: string

	@Column({ name: 'contact_phone' })
	contactPhone: string
}

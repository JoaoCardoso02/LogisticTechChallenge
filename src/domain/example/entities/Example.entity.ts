import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class ExampleEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	age: number
}

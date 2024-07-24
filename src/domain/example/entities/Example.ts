import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IExample } from '../types/IExample'

@Entity()
export default class Example {
	@PrimaryGeneratedColumn()
	id?: number

	@Column()
	name: string

	@Column()
	age: number

	constructor(example: IExample) {
		this.id = example.id;
		this.name = example.name;
		this.age = example.age;
	}
}

import Example from '@domain/example/entities/Example'
import { ICreateExample } from '@domain/example/types/ICreateExample'

export interface IExampleRepository {
	getAll(): Promise<Example[]>
	getOne(id: number): Promise<Example | null>
	create(example: ICreateExample): Promise<Example>
	update(id: number, example: ICreateExample): Promise<Example | null>
	delete(id: number): Promise<boolean>
}

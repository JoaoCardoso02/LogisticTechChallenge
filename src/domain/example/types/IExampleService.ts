import Example from '@domain/example/entities/Example.entity'
import { ICreateExample } from '@domain/example/types/ICreateExample'

export interface IExampleService {
	findAll(): Promise<Example[]>
	findOne(id: number): Promise<Example | null>
	create(example: ICreateExample): Promise<Example>
	update(id: number, example: ICreateExample): Promise<Example | null>
	delete(id: number): Promise<boolean>
}

import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import Example from '@domain/example/entities/Example'

import { ICreateExample } from '@domain/example/types/ICreateExample'
import { IExampleService } from '@domain/example/types/IExampleService'
import { IExampleRepository } from '../types/IExampleRepository'

@injectable()
export default class ExampleService implements IExampleService {
	constructor(
		@inject(tokens.ExampleRepository)
		private exampleRepository: IExampleRepository
	) {}

	async findAll(): Promise<Example[]> {
		return await this.exampleRepository.getAll()
	}

	async findOne(id: number): Promise<Example | null> {
		return await this.exampleRepository.getOne(id)
	}

	async create(example: ICreateExample): Promise<Example> {
		return await this.exampleRepository.create(example)
	}

	async update(id: number, example: ICreateExample): Promise<Example | null> {
		return await this.exampleRepository.update(id, example)
	}

	async delete(id: number): Promise<boolean> {
		return await this.exampleRepository.delete(id)
	}
}

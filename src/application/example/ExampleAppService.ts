import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import Example from '@domain/example/entities/Example'
import { IExampleService } from '@domain/example/types/IExampleService'
import { ICreateExample } from '@domain/example/types/ICreateExample'

@injectable()
export default class ExampleAppService {
	constructor(
		@inject(tokens.ExampleService)
		private exampleService: IExampleService
	) {}

	async findAll(): Promise<Example[]> {
		return await this.exampleService.findAll()
	}

	async findOne(id: number): Promise<Example | null> {
		return await this.exampleService.findOne(id)
	}

	async create(data: ICreateExample): Promise<Example> {
		return await this.exampleService.create(data)
	}

	async update(id: number, data: ICreateExample): Promise<Example | null> {
		return await this.exampleService.update(id, data)
	}

	async delete(id: number): Promise<boolean> {
		return await this.exampleService.delete(id)
	}
}

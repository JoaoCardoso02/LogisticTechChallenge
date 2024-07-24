import { tokens } from '@di/tokens'
import Example from '@domain/example/entities/Example'
import { IExampleRepository } from '@domain/example/types/IExampleRepository'
import { ICreateExample } from '@domain/example/types/ICreateExample'
import { PostgreSQLClient } from '@infrastructure/postgresql/PostgreSQLClient'
import { inject, injectable } from 'tsyringe'
import { Repository } from 'typeorm'

@injectable()
export default class ExampleRepository implements IExampleRepository {
	private readonly client: Repository<Example>

	constructor(
		@inject(tokens.PostgreSQLClient)
		psql: PostgreSQLClient,
	) {
		this.client = psql.getRepository(Example);
	}

	async getAll(): Promise<Example[]> {
		return await this.client.find()
	}

	async getOne(id: number): Promise<Example | null> {
		return await this.client.findOneBy({ id })
	}

	async create(example: ICreateExample): Promise<Example> {
		const newExample = await this.client.save(example)
		return newExample
	}

	async update(id: number, example: ICreateExample): Promise<Example | null> {
		await this.client.update({ id: id }, example)

		return this.getOne(id);
	}

	async delete(id: number): Promise<boolean> {
		const result = await this.client.delete({ id })
		if (!result.affected) return false
		return true
	}
}

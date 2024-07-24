import { tokens } from '@di/tokens'
import Location from '@domain/location/entities/Location'
import { ILocationRepository } from '@domain/location/types/ILocationRepository'
import { ICreateLocation } from '@domain/location/types/ICreateLocation'
import { PostgreSQLClient } from '@infrastructure/postgresql/PostgreSQLClient'
import { inject, injectable } from 'tsyringe'
import { Repository } from 'typeorm'
import { IUpdateLocation } from '../types/IUpdateLocation'

@injectable()
export default class LocationRepository implements ILocationRepository {
	private readonly client: Repository<Location>

	constructor(
		@inject(tokens.PostgreSQLClient)
		psql: PostgreSQLClient,
	) {
		this.client = psql.getRepository(Location);
	}

	async getAll(): Promise<Location[]> {
		return await this.client.find()
	}

	async getOne(id: string): Promise<Location | null> {
		return await this.client.findOneBy({ id })
	}

	async create(location: ICreateLocation): Promise<Location> {
		const newLocation = await this.client.save(location)
		return newLocation
	}

	async update(id: string, location: IUpdateLocation): Promise<Location | null> {
		await this.client.update({ id: id }, location)

		return this.getOne(id);
	}

	async delete(id: string): Promise<boolean> {
		const result = await this.client.delete({ id })
		if (!result.affected) return false
		return true
	}
}

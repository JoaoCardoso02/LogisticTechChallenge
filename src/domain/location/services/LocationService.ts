import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import Location from '@domain/location/entities/Location'

import { ICreateLocation } from '@domain/location/types/ICreateLocation'
import { ILocationService } from '@domain/location/types/ILocationService'
import { ILocationRepository } from '../types/ILocationRepository'
import { IUpdateLocation } from '../types/IUpdateLocation'

@injectable()
export default class LocationService implements ILocationService {
	constructor(
		@inject(tokens.LocationRepository)
		private locationRepository: ILocationRepository
	) {}

	async findAll(): Promise<Location[]> {
		return await this.locationRepository.getAll()
	}

	async findOne(id: string): Promise<Location | null> {
		return await this.locationRepository.getOne(id)
	}

	async create(location: ICreateLocation): Promise<Location> {
		return await this.locationRepository.create(location)
	}

	async update(id: string, location: IUpdateLocation): Promise<Location | null> {
		return await this.locationRepository.update(id, location)
	}

	async delete(id: string): Promise<boolean> {
		return await this.locationRepository.delete(id)
	}
}

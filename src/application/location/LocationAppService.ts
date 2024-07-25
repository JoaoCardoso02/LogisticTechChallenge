import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import Location from '@domain/location/entities/Location'
import { ILocationService } from '@domain/location/types/ILocationService'
import { ICreateLocation } from '@domain/location/types/ICreateLocation'
import { IUpdateLocation } from '@domain/location/types/IUpdateLocation'

@injectable()
export default class LocationAppService {
	constructor(
		@inject(tokens.LocationService)
		private locationService: ILocationService
	) {}

	async findAll(): Promise<Location[]> {
		return await this.locationService.findAll()
	}

	async findOne(id: string): Promise<Location | null> {
		return await this.locationService.findOne(id)
	}

	async create(data: ICreateLocation): Promise<Location> {
		return await this.locationService.create(data)
	}

	async update(id: string, data: IUpdateLocation): Promise<Location | null> {
		return await this.locationService.update(id, data)
	}

	async delete(id: string): Promise<boolean> {
		return await this.locationService.delete(id)
	}
}

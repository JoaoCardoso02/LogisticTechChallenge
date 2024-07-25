import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import LocationAppService from '@application/location/LocationAppService'

import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class GetAllLocationsController extends BaseController {
	constructor(
		@inject(tokens.LocationAppService)
		private locationAppService: LocationAppService
	) {
		super()
	}

	public async execute() {
		try {
			const result = await this.locationAppService.findAll()
			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

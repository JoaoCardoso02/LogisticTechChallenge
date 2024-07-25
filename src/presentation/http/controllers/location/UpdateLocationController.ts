import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import LocationAppService from '@application/location/LocationAppService'

import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'
import { IUpdateLocation } from '@domain/location/types/IUpdateLocation'

@injectable()
export default class UpdateLocationController extends BaseController {
	constructor(
		@inject(tokens.LocationAppService)
		private locationAppService: LocationAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { id } = request.params
			const {
				address,
				contactName,
				contactPhone,
			} = request.body

			const result = await this.locationAppService.update(id, {
				address,
				contactName,
				contactPhone,
			} as IUpdateLocation)

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

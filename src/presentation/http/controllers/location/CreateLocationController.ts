import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import BaseController from '@shared/http/controller/BaseController'
import LocationAppService from '@application/location/LocationAppService'

import { ICreateLocation } from '@domain/location/types/ICreateLocation'
import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class CreateLocationController extends BaseController {
	constructor(
		@inject(tokens.LocationAppService)
		private locationAppService: LocationAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const {
				address,
				contactName,
				contactPhone,
			} = request.body

			const result = await this.locationAppService.create({
				address,
				contactName,
				contactPhone,
			} as ICreateLocation)

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

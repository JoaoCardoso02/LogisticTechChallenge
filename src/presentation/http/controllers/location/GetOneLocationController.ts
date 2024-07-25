import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import LocationAppService from '@application/location/LocationAppService'

import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class GetOneLocationController extends BaseController {
	constructor(
		@inject(tokens.LocationAppService)
		private locationAppService: LocationAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { id } = request.params

			const result = await this.locationAppService.findOne(id)

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

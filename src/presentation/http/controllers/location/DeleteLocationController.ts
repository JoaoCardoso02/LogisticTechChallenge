import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'
import BaseController from '@shared/http/controller/BaseController'
import LocationAppService from '@application/location/LocationAppService'

import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class DeleteLocationController extends BaseController {
	constructor(
		@inject(tokens.LocationAppService)
		private locationAppService: LocationAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { id } = request.params

			await this.locationAppService.delete(id)

			return this.sendStatus(204)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

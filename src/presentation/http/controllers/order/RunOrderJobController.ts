import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import BaseController from '@shared/http/controller/BaseController'

import { BaseError } from '@shared/exceptions/BaseError'
import OrderJobAppService from '@application/order/OrderJobAppService'

@injectable()
export default class RunOrderJobController extends BaseController {
	constructor(
		@inject(tokens.OrderJobAppService)
		private jobOrderAppService: OrderJobAppService
	) {
		super()
	}

	public async execute() {
		try {
			await this.jobOrderAppService.run()

			return this.sendStatus(204)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import OrderAppService from '@application/order/OrderAppService'

import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class GetAllOrdersController extends BaseController {
	constructor(
		@inject(tokens.OrderAppService)
		private orderAppService: OrderAppService
	) {
		super()
	}

	public async execute() {
		try {
			const result = await this.orderAppService.findAll()
			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

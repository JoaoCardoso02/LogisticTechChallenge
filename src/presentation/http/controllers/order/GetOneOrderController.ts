import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import OrderAppService from '@application/order/OrderAppService'

import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class GetOneOrderController extends BaseController {
	constructor(
		@inject(tokens.OrderAppService)
		private orderAppService: OrderAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { id } = request.params

			const result = await this.orderAppService.findOne(id)

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

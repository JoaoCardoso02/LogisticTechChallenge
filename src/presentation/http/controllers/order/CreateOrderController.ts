import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import BaseController from '@shared/http/controller/BaseController'
import OrderAppService from '@application/order/OrderAppService'

import { ICreateOrder } from '@domain/order/types/ICreateOrder'
import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class CreateOrderController extends BaseController {
	constructor(
		@inject(tokens.OrderAppService)
		private orderAppService: OrderAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const {
				type,
				weight,
				originId,
				destinationId
			} = request.body

			const result = await this.orderAppService.create({
				type,
				weight,
				originId,
				destinationId
			} as ICreateOrder)

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

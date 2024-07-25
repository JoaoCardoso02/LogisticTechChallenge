import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import OrderAppService from '@application/order/OrderAppService'

import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'
import { IUpdateOrder } from '@domain/order/types/IUpdateOrder'

@injectable()
export default class UpdateOrderController extends BaseController {
	constructor(
		@inject(tokens.OrderAppService)
		private orderAppService: OrderAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { id } = request.params
			const {
				type,
				weight,
				originId,
				destinationId
			} = request.body

			const result = await this.orderAppService.update(id, {
				type,
				weight,
				originId,
				destinationId
			} as IUpdateOrder)

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

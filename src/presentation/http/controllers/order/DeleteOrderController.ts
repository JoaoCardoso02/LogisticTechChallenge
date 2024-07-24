import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'
import BaseController from '@shared/http/controller/BaseController'
import OrderAppService from '@application/order/OrderAppService'

import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class DeleteOrderController extends BaseController {
	constructor(
		@inject(tokens.OrderAppService)
		private orderAppService: OrderAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { id } = request.params

			await this.orderAppService.delete(Number(id))

			return this.sendStatus(204)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

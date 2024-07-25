import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'
import BaseController from '@shared/http/controller/BaseController'
import ProductAppService from '@application/product/ProductAppService'

import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class DeleteProductController extends BaseController {
	constructor(
		@inject(tokens.ProductAppService)
		private productAppService: ProductAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { id } = request.params

			await this.productAppService.delete(id)

			return this.sendStatus(204)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

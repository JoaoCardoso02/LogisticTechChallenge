import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import ProductAppService from '@application/product/ProductAppService'

import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class GetOneProductController extends BaseController {
	constructor(
		@inject(tokens.ProductAppService)
		private productAppService: ProductAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { id } = request.params

			const result = await this.productAppService.findOne(id)

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import ProductAppService from '@application/product/ProductAppService'

import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class GetAllProductsController extends BaseController {
	constructor(
		@inject(tokens.ProductAppService)
		private productAppService: ProductAppService
	) {
		super()
	}

	public async execute() {
		try {
			const result = await this.productAppService.findAll()
			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import BaseController from '@shared/http/controller/BaseController'
import ProductAppService from '@application/product/ProductAppService'

import { ICreateProduct } from '@domain/product/types/ICreateProduct'
import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class CreateProductController extends BaseController {
	constructor(
		@inject(tokens.ProductAppService)
		private productAppService: ProductAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const {
				type,
				length,
				width,
				height,
				weight,
				orderId,
			} = request.body

			const result = await this.productAppService.create({
				type,
				length,
				width,
				height,
				weight,
				orderId,
			} as ICreateProduct)

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import ProductAppService from '@application/product/ProductAppService'

import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'
import { IUpdateProduct } from '@domain/product/types/IUpdateProduct'

@injectable()
export default class UpdateProductController extends BaseController {
	constructor(
		@inject(tokens.ProductAppService)
		private productAppService: ProductAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { id } = request.params
			const {
				type,
				length,
				width,
				height,
				weight,
				orderId,
			} = request.body

			const result = await this.productAppService.update(id, {
				type,
				length,
				width,
				height,
				weight,
				orderId,
			} as IUpdateProduct)

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}

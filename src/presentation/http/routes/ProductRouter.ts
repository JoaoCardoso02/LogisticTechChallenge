import { Router } from 'express'

import BaseRouter from '@shared/http/controller/BaseRouter'
import BaseController from '@shared/http/controller/BaseController'

import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import { IRouter } from './IRouter'

@injectable()
export class ProductRouter extends BaseRouter implements IRouter {
	constructor(
		@inject(tokens.GetAllProductsController)
		private getAllProductsController: BaseController,

		@inject(tokens.GetOneProductController)
		private getOneProductController: BaseController,

		@inject(tokens.CreateProductController)
		private createProductController: BaseController,

		@inject(tokens.UpdateProductController)
		private updateProductController: BaseController,

		@inject(tokens.DeleteProductController)
		private deleteProductController: BaseController
	) {
		super(Router())
	}

	setup(): Router {
		this.get('/v1/products', this.getAllProductsController)
		this.get('/v1/products/:id', this.getOneProductController)
		this.post('/v1/products', this.createProductController)
		this.patch('/v1/products/:id', this.updateProductController)
		this.delete('/v1/products/:id', this.deleteProductController)

		return this.getRouter()
	}
}

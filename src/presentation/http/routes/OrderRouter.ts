import { Router } from 'express'

import BaseRouter from '@shared/http/controller/BaseRouter'
import BaseController from '@shared/http/controller/BaseController'

import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import { IRouter } from './IRouter'

@injectable()
export class OrderRouter extends BaseRouter implements IRouter {
	constructor(
		@inject(tokens.GetAllOrdersController)
		private getAllOrdersController: BaseController,

		@inject(tokens.GetOneOrderController)
		private getOneOrderController: BaseController,

		@inject(tokens.CreateOrderController)
		private createOrderController: BaseController,

		@inject(tokens.UpdateOrderController)
		private updateOrderController: BaseController,

		@inject(tokens.DeleteOrderController)
		private deleteOrderController: BaseController,

		@inject(tokens.RunOrderJobController)
		private runOrderJobController: BaseController,
	) {
		super(Router())
	}

	setup(): Router {
		this.get('/v1/orders', this.getAllOrdersController)
		this.get('/v1/orders/:id', this.getOneOrderController)
		this.post('/v1/orders', this.createOrderController)
		this.patch('/v1/orders/:id', this.updateOrderController)
		this.delete('/v1/orders/:id', this.deleteOrderController)
		this.post('/v1/orders/run', this.runOrderJobController)

		return this.getRouter()
	}
}

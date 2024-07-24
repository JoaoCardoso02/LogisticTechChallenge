import { tokens } from '@di/tokens'
import BaseController from '@shared/http/controller/BaseController'
import { inject, injectable } from 'tsyringe'
import { IRouter } from './IRouter'
import BaseRouter from '@shared/http/controller/BaseRouter'
import { Router } from 'express'

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
		private deleteOrderController: BaseController
	) {
		super(Router())
	}

	setup(): Router {
		this.get('/v1/orders', this.getAllOrdersController)
		this.get('/v1/orders/:id', this.getOneOrderController)
		this.post('/v1/orders', this.createOrderController)
		this.patch('/v1/orders/:id', this.updateOrderController)
		this.delete('/v1/orders/:id', this.deleteOrderController)

		return this.getRouter()
	}
}

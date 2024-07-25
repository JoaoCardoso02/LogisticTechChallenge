import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import Order from '@domain/order/entities/Order'
import { IOrderService } from '@domain/order/types/IOrderService'
import { ICreateOrder } from '@domain/order/types/ICreateOrder'
import { IUpdateOrder } from '@domain/order/types/IUpdateOrder'

@injectable()
export default class OrderAppService {
	constructor(
		@inject(tokens.OrderService)
		private orderService: IOrderService
	) {}

	async findAll(): Promise<Order[]> {
		return await this.orderService.findAll()
	}

	async findOne(id: string): Promise<Order | null> {
		return await this.orderService.findOne(id)
	}

	async create(data: ICreateOrder): Promise<Order> {
		return await this.orderService.create(data)
	}

	async update(id: string, data: IUpdateOrder): Promise<Order | null> {
		return await this.orderService.update(id, data)
	}

	async delete(id: string): Promise<boolean> {
		return await this.orderService.delete(id)
	}
}

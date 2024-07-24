import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import Order from '@domain/order/entities/Order'

import { ICreateOrder } from '@domain/order/types/ICreateOrder'
import { IOrderService } from '@domain/order/types/IOrderService'
import { IOrderRepository } from '../types/IOrderRepository'
import { IUpdateOrder } from '../types/IUpdateOrder'

@injectable()
export default class OrderService implements IOrderService {
	constructor(
		@inject(tokens.OrderRepository)
		private orderRepository: IOrderRepository
	) {}

	async findAll(): Promise<Order[]> {
		return await this.orderRepository.getAll()
	}

	async findOne(id: number): Promise<Order | null> {
		return await this.orderRepository.getOne(id)
	}

	async create(order: ICreateOrder): Promise<Order> {
		return await this.orderRepository.create(order)
	}

	async update(id: number, order: IUpdateOrder): Promise<Order | null> {
		return await this.orderRepository.update(id, order)
	}

	async delete(id: number): Promise<boolean> {
		return await this.orderRepository.delete(id)
	}
}

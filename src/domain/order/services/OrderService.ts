import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import Order from '@domain/order/entities/Order'

import { ICreateOrder } from '@domain/order/types/ICreateOrder'
import { IOrderService } from '@domain/order/types/IOrderService'
import { IOrderRepository } from '../types/IOrderRepository'
import { IUpdateOrder } from '../types/IUpdateOrder'
import { IExternalOrderRepository } from '../types/IExternalOrderRepository'
import { IExternalOrder } from '../types/IExternalOrder'

@injectable()
export default class OrderService implements IOrderService {
	constructor(
		@inject(tokens.OrderRepository)
		private orderRepository: IOrderRepository,

		@inject(tokens.ExternalOrderRepository)
		private externalOrderRepository: IExternalOrderRepository,
	) {}

	async findAll(): Promise<Order[]> {
		return await this.orderRepository.getAll()
	}

	async fetch(): Promise<IExternalOrder[]> {
		return await this.externalOrderRepository.getAll()
	}

	async findOne(id: string): Promise<Order | null> {
		return await this.orderRepository.getOne(id)
	}

	async findOneByExternalId(externalId: string): Promise<Order | null> {
		return await this.orderRepository.getOneByExternalId(externalId)
	}

	async create(order: ICreateOrder): Promise<Order> {
		return await this.orderRepository.create(order)
	}

	async update(id: string, order: IUpdateOrder): Promise<Order | null> {
		return await this.orderRepository.update(id, order)
	}

	async delete(id: string): Promise<boolean> {
		return await this.orderRepository.delete(id)
	}
}

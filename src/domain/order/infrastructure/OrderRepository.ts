import { tokens } from '@di/tokens'
import Order from '@domain/order/entities/Order'
import { IOrderRepository } from '@domain/order/types/IOrderRepository'
import { ICreateOrder } from '@domain/order/types/ICreateOrder'
import { PostgreSQLClient } from '@infrastructure/postgresql/PostgreSQLClient'
import { inject, injectable } from 'tsyringe'
import { Repository } from 'typeorm'
import { IUpdateOrder } from '../types/IUpdateOrder'

@injectable()
export default class OrderRepository implements IOrderRepository {
	private readonly client: Repository<Order>

	constructor(
		@inject(tokens.PostgreSQLClient)
		psql: PostgreSQLClient,
	) {
		this.client = psql.getRepository(Order);
	}

	async getAll(): Promise<Order[]> {
		return await this.client.find()
	}

	async getOne(id: number): Promise<Order | null> {
		return await this.client.findOneBy({ id })
	}

	async create(order: ICreateOrder): Promise<Order> {
		const newOrder = await this.client.save(order)
		return newOrder
	}

	async update(id: number, order: IUpdateOrder): Promise<Order | null> {
		await this.client.update({ id: id }, order)

		return this.getOne(id);
	}

	async delete(id: number): Promise<boolean> {
		const result = await this.client.delete({ id })
		if (!result.affected) return false
		return true
	}
}

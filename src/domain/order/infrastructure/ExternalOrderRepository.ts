import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'
import HttpClient from '@infrastructure/http/HttpClient'
import { IExternalOrderRepository } from '@domain/order/types/IExternalOrderRepository'
import { IExternalOrder } from '../types/IExternalOrder'

@injectable()
export default class ExternalOrderRepository implements IExternalOrderRepository {
	constructor(
		@inject(tokens.HttpClient)
		private client: HttpClient,
	) {
	}

	async getAll(): Promise<IExternalOrder[]> {
		return await this.client.get('orders')
	}
}

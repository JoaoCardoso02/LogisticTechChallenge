import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import { IOrderService } from '@domain/order/types/IOrderService'
import { ILocationService } from '@domain/location/types/ILocationService'
import { IExternalOrder } from '@domain/order/types/IExternalOrder'
import { IProductService } from '@domain/product/types/IProductService'

@injectable()
export default class OrderJobAppService {
	constructor(
		@inject(tokens.OrderService)
		private orderService: IOrderService,

		@inject(tokens.LocationService)
		private locationService: ILocationService,

		@inject(tokens.ProductService)
		private productService: IProductService,
	) {}

	async run(): Promise<void> {
		const orders = await this.orderService.fetch()
	
		await Promise.all(orders.map(async (externalOrder) => {
			const order = await this.orderService.findOneByExternalId(externalOrder.id);
			if (order == null) {
				await this.create(externalOrder);
			}
			else {
				externalOrder.id = order.id
				externalOrder.originId = order.originId
				externalOrder.destinationId = order.destinationId
				await this.update(externalOrder)
			}
		}))
	}

	private async create(externalOrder: IExternalOrder): Promise<void> {
		const pickup = await this.locationService.create(externalOrder.pickup)
		const destination = await this.locationService.create(externalOrder.destination)
		const order = await this.orderService.create({
			type: externalOrder.type,
			weight: externalOrder.weight,
			originId: pickup.id,
			destinationId: destination.id,
			externalId: externalOrder.id
		})

		await this.productService.createMany(
			externalOrder.items.map((item) => ({ ...item, orderId: order.id }))
		)
	}

	private async update(externalOrder: IExternalOrder): Promise<void> {
		await this.locationService.update(externalOrder.originId, externalOrder.pickup)
		await this.locationService.update(externalOrder.destinationId, externalOrder.destination)
		await this.orderService.update(
			externalOrder.id,
			{
				type: externalOrder.type,
				weight: externalOrder.weight,
				originId: externalOrder.originId,
				destinationId: externalOrder.destinationId
			}
		)

		await this.productService.deleteByOrderId(externalOrder.id)
		await this.productService.createMany(
			externalOrder.items.map((item) => ({ ...item, orderId: externalOrder.id }))
		)
	}
}

import Order from '@domain/order/entities/Order'
import { ICreateOrder } from '@domain/order/types/ICreateOrder'
import { IExternalOrder } from './IExternalOrder'

export interface IOrderService {
	findAll(): Promise<Order[]>
	fetch(): Promise<IExternalOrder[]>
	findOne(id: string): Promise<Order | null>
	findOneByExternalId(externalId: string): Promise<Order | null>
	create(order: ICreateOrder): Promise<Order>
	update(id: string, order: ICreateOrder): Promise<Order | null>
	delete(id: string): Promise<boolean>
}

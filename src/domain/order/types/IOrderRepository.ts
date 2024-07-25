import Order from '@domain/order/entities/Order'
import { ICreateOrder } from '@domain/order/types/ICreateOrder'

export interface IOrderRepository {
	getAll(): Promise<Order[]>
	getOne(id: string): Promise<Order | null>
	create(order: ICreateOrder): Promise<Order>
	update(id: string, order: ICreateOrder): Promise<Order | null>
	delete(id: string): Promise<boolean>
}

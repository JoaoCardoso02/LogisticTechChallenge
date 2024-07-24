import Order from '@domain/order/entities/Order'
import { ICreateOrder } from '@domain/order/types/ICreateOrder'

export interface IOrderService {
	findAll(): Promise<Order[]>
	findOne(id: number): Promise<Order | null>
	create(order: ICreateOrder): Promise<Order>
	update(id: number, order: ICreateOrder): Promise<Order | null>
	delete(id: number): Promise<boolean>
}
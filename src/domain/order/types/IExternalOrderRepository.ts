import { IExternalOrder } from '@domain/order/types/IExternalOrder'

export interface IExternalOrderRepository {
	getAll(): Promise<IExternalOrder[]>
}

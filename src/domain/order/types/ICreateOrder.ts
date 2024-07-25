import { IOrder } from './IOrder'

export type ICreateOrder = Omit<IOrder, 'items'> & { id?: string }

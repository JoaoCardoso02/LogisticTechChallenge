import { IOrder } from './IOrder'

export type ICreateOrder = Omit<IOrder, 'id'>

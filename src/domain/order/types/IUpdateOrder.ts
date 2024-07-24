import { IOrder } from './IOrder'

export type IUpdateOrder = Omit<IOrder, 'id'>

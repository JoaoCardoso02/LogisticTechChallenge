import { IOrder } from './IOrder'

export type IOrderRaw = Omit<IOrder, 'id'> & { _id: string }

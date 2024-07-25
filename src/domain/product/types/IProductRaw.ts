import { IProduct } from './IProduct'

export type IProductRaw = Omit<IProduct, 'id'> & { _id: string }

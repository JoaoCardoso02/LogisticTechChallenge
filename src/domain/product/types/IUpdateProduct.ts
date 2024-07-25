import { IProduct } from './IProduct'

export type IUpdateProduct = Omit<IProduct, 'id'>

import { IProduct } from './IProduct'

export type ICreateProduct = Omit<IProduct, 'id'>

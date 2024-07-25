import Product from '@domain/product/entities/Product'
import { ICreateProduct } from '@domain/product/types/ICreateProduct'

export interface IProductService {
	findAll(): Promise<Product[]>
	findOne(id: string): Promise<Product | null>
	create(product: ICreateProduct): Promise<Product>
	createMany(products: ICreateProduct[]): Promise<Product[]>
	update(id: string, product: ICreateProduct): Promise<Product | null>
	delete(id: string): Promise<boolean>
	deleteByOrderId(orderId: string): Promise<boolean>
}

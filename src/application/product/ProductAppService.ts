import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import Product from '@domain/product/entities/Product'
import { IProductService } from '@domain/product/types/IProductService'
import { ICreateProduct } from '@domain/product/types/ICreateProduct'
import { IUpdateProduct } from '@domain/product/types/IUpdateProduct'

@injectable()
export default class ProductAppService {
	constructor(
		@inject(tokens.ProductService)
		private productService: IProductService
	) {}

	async findAll(): Promise<Product[]> {
		return await this.productService.findAll()
	}

	async findOne(id: string): Promise<Product | null> {
		return await this.productService.findOne(id)
	}

	async create(data: ICreateProduct): Promise<Product> {
		return await this.productService.create(data)
	}

	async update(id: string, data: IUpdateProduct): Promise<Product | null> {
		return await this.productService.update(id, data)
	}

	async delete(id: string): Promise<boolean> {
		return await this.productService.delete(id)
	}
}

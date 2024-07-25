import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import Product from '@domain/product/entities/Product'

import { ICreateProduct } from '@domain/product/types/ICreateProduct'
import { IProductService } from '@domain/product/types/IProductService'
import { IProductRepository } from '../types/IProductRepository'
import { IUpdateProduct } from '../types/IUpdateProduct'

@injectable()
export default class ProductService implements IProductService {
	constructor(
		@inject(tokens.ProductRepository)
		private productRepository: IProductRepository
	) {}

	async findAll(): Promise<Product[]> {
		return await this.productRepository.getAll()
	}

	async findOne(id: string): Promise<Product | null> {
		return await this.productRepository.getOne(id)
	}

	async create(product: ICreateProduct): Promise<Product> {
		return await this.productRepository.create(product)
	}

	async createMany(products: ICreateProduct[]): Promise<Product[]> {
		return await this.productRepository.createMany(products)
	}

	async update(id: string, product: IUpdateProduct): Promise<Product | null> {
		return await this.productRepository.update(id, product)
	}

	async delete(id: string): Promise<boolean> {
		return await this.productRepository.delete(id)
	}

	async deleteByOrderId(orderId: string): Promise<boolean> {
		return await this.productRepository.deleteByOrderId(orderId)
	}
}

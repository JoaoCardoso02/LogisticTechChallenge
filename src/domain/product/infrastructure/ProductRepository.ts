import { tokens } from '@di/tokens'
import Product from '@domain/product/entities/Product'
import { IProductRepository } from '@domain/product/types/IProductRepository'
import { ICreateProduct } from '@domain/product/types/ICreateProduct'
import { PostgreSQLClient } from '@infrastructure/postgresql/PostgreSQLClient'
import { inject, injectable } from 'tsyringe'
import { Repository } from 'typeorm'
import { IUpdateProduct } from '../types/IUpdateProduct'

@injectable()
export default class ProductRepository implements IProductRepository {
	private readonly client: Repository<Product>

	constructor(
		@inject(tokens.PostgreSQLClient)
		psql: PostgreSQLClient,
	) {
		this.client = psql.getRepository(Product);
	}

	async getAll(): Promise<Product[]> {
		return await this.client.find()
	}

	async getOne(id: string): Promise<Product | null> {
		return await this.client.findOneBy({ id })
	}

	async create(product: ICreateProduct): Promise<Product> {
		const newProduct = await this.client.save(product)
		return newProduct
	}

	async createMany(products: ICreateProduct[]): Promise<Product[]> {
		const newProduct = await this.client.save(products)
		return newProduct
	}

	async update(id: string, product: IUpdateProduct): Promise<Product | null> {
		await this.client.update({ id: id }, product)

		return this.getOne(id);
	}

	async delete(id: string): Promise<boolean> {
		const result = await this.client.delete({ id })
		if (!result.affected) return false
		return true
	}

	async deleteByOrderId(orderId: string): Promise<boolean> {
		const result = await this.client.delete({ orderId })
		if (!result.affected) return false
		return true
	}
}

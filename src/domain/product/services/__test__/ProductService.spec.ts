import {
	productMock,
	productToCreateMock,
	productToUpdateMock,
	productUpdatedMock,
} from '@domain/product/__mocks__/Product'
import ProductService from '@domain/product/services/ProductService'

const makeProductRepositoryStub = () => {
	const ProductRepositoryStub = {
		getAll: jest.fn().mockResolvedValue([productMock]),
		getOne: jest.fn().mockResolvedValue(productMock),
		create: jest.fn().mockResolvedValue(productMock),
		createMany: jest.fn().mockResolvedValue([productMock]),
		update: jest.fn().mockResolvedValue(productUpdatedMock),
		delete: jest.fn().mockResolvedValue(true),
		deleteByOrderId: jest.fn().mockResolvedValue(true),
	}

	return ProductRepositoryStub
}

const makeSut = () => {
	const productRepositoryStub = makeProductRepositoryStub()
	const sut = new ProductService(productRepositoryStub)

	return {
		sut,
		productRepositoryStub,
	}
}

const id = 'ec12555f-44bc-4bfb-8f98-94053f2c73a2'
const orderId = 'eecfba8f-ebaf-433a-9f14-413d7cebf804'

describe('ProductService', () => {
	it('should create an ProductService instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(ProductService)
	})

	it('should get all products successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findAll()

		expect(result).toEqual([productMock])
	})

	it('should get one products by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findOne(id)

		expect(result).toEqual(productMock)
	})

	it('should create one product successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.create(productToCreateMock)

		expect(result).toEqual(productMock)
	})

	it('should update one product by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.update(id, productToUpdateMock)

		expect(result).toEqual(productUpdatedMock)
	})

	it('should delete one product successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.delete(id)

		expect(result).toBeTruthy()
	})

	it('should delete products by order id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.delete(orderId)

		expect(result).toBeTruthy()
	})
})

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
		update: jest.fn().mockResolvedValue(productUpdatedMock),
		delete: jest.fn().mockResolvedValue(true),
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

describe('ProductService', () => {
	it('should create an ProductService instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(ProductService)
	})

	it('should get all Products successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findAll()

		expect(result).toEqual([productMock])
	})

	it('should get one Products by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findOne('uuid')

		expect(result).toEqual(productMock)
	})

	it('should create one Product successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.create(productToCreateMock)

		expect(result).toEqual(productMock)
	})

	it('should update one Product by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.update('uuid', productToUpdateMock)

		expect(result).toEqual(productUpdatedMock)
	})

	it('should delete one Product successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.delete('uuid')

		expect(result).toBeTruthy()
	})
})

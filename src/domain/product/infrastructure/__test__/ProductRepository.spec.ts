import ProductRepository from '@domain/product/infrastructure/ProductRepository'
import {
	productMock,
	productGotMock,
	productToCreateMock,
	productToUpdateMock,
	productUpdatedMock,
	productDeletedRawMock,
	productFailDeleteRawMock,
} from '@domain/product/__mocks__/Product'

const makePostgreSQLClient = () => {
	const PostgreSQLClientStub = jest.fn().mockImplementation(() => ({
		find: jest.fn().mockResolvedValue([productGotMock]),
		findOneBy: jest.fn().mockResolvedValue(productGotMock),
		save: jest.fn().mockResolvedValue(productMock),
		update: jest.fn(),
		delete: jest.fn().mockResolvedValue(productDeletedRawMock),
		getRepository: jest.fn().mockReturnThis(),
	}))

	return new PostgreSQLClientStub()
}

const makeSut = () => {
	const postgreSQLClientStub = makePostgreSQLClient()
	const sut = new ProductRepository(postgreSQLClientStub)
	return {
		sut,
		postgreSQLClientStub,
	}
}

const id = 'ec12555f-44bc-4bfb-8f98-94053f2c73a2'
const orderId = 'eecfba8f-ebaf-433a-9f14-413d7cebf804'

describe('ProductRepository', () => {
	it('should create an ProductRepository instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(ProductRepository)
	})

	describe('GetAll', () => {
		it('should return an empty array if does not exist any products', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest.spyOn(postgreSQLClientStub, 'find').mockResolvedValueOnce([])

			const result = await sut.getAll()

			expect(result).toEqual([])
		})

		it('should return a list of products', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findSpy = jest.spyOn(postgreSQLClientStub, 'find')

			const result = await sut.getAll()

			expect(findSpy).toBeCalled()
			expect(result).toEqual([productMock])
		})

		it('should throw if find method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findSpy = jest
				.spyOn(postgreSQLClientStub, 'find')
				.mockRejectedValue(new Error('some error'))

			const result = sut.getAll()

			expect(findSpy).toBeCalled()
			await expect(result).rejects.toThrow()
		})
	})

	describe('GetOne', () => {

		it('should returns a product successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findOneBySpy = jest.spyOn(postgreSQLClientStub, 'findOneBy')

			const result = await sut.getOne(id)

			expect(findOneBySpy).toBeCalledWith({ id })
			expect(result).toEqual(productMock)
		})

		it('should throw if findOne method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findOneBySpy = jest
				.spyOn(postgreSQLClientStub, 'findOneBy')
				.mockRejectedValue(new Error('some error'))

			const result = sut.getOne(id)

			expect(findOneBySpy).toBeCalledWith({ id })
			await expect(result).rejects.toThrow()
		})
	})

	describe('Create', () => {
		it('should create an product successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const saveSpy = jest.spyOn(postgreSQLClientStub, 'save')

			const result = await sut.create(productToCreateMock)

			expect(saveSpy).toBeCalledWith(productToCreateMock)
			expect(result).toEqual(productMock)
		})

		it('should throw if create method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const saveSpy = jest
				.spyOn(postgreSQLClientStub, 'save')
				.mockRejectedValue(new Error('some error'))

			const result = sut.create(productToCreateMock)

			expect(saveSpy).toBeCalledWith(productToCreateMock)
			await expect(result).rejects.toThrow()
		})
	})

	describe('Update', () => {
		it('should update an product successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const updateSpy = jest.spyOn(postgreSQLClientStub, 'update')
			const getOneSpy = jest.spyOn(sut, 'getOne').mockResolvedValueOnce(productUpdatedMock)

			const result = await sut.update(id, productToUpdateMock)

			expect(updateSpy).toBeCalledWith(
				{ id },
				productToUpdateMock
			)
			expect(getOneSpy).toBeCalledWith(id)
			expect(result).toEqual(productUpdatedMock)
		})

		it('should throw if update method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'update')
				.mockRejectedValue(new Error('some error'))

			const result = sut.update(id, productToUpdateMock)

			await expect(result).rejects.toThrow()
		})
	})

	describe('Delete', () => {
		it('should delete an product successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const deleteSpy = jest.spyOn(postgreSQLClientStub, 'delete')

			const result = await sut.delete(id)

			expect(deleteSpy).toBeCalledWith({ id })
			expect(result).toEqual(true)
		})

		it('should return false if no product is deleted', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'delete')
				.mockResolvedValue(productFailDeleteRawMock)

			const result = await sut.delete(id)

			expect(result).toEqual(false)
		})

		it('should throw if delete method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'delete')
				.mockRejectedValue(new Error('some error'))

			const result = sut.delete(id)

			await expect(result).rejects.toThrow()
		})
	})

	describe('Delete By Order Id', () => {
		it('should delete all products by order id successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const deleteSpy = jest.spyOn(postgreSQLClientStub, 'delete')

			const result = await sut.deleteByOrderId(orderId)

			expect(deleteSpy).toBeCalledWith({ orderId })
			expect(result).toEqual(true)
		})

		it('should return false if no product is deleted', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'delete')
				.mockResolvedValue(productFailDeleteRawMock)

			const result = await sut.deleteByOrderId(orderId)

			expect(result).toEqual(false)
		})

		it('should throw if delete method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'delete')
				.mockRejectedValue(new Error('some error'))

			const result = sut.deleteByOrderId(orderId)

			await expect(result).rejects.toThrow()
		})
	})
})

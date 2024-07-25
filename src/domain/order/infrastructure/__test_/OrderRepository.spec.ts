import OrderRepository from '@domain/order/infrastructure/OrderRepository'
import {
	orderMock,
	orderGotMock,
	orderToCreateMock,
	orderToUpdateMock,
	orderUpdatedMock,
	orderDeletedRawMock,
	orderFailDeleteRawMock,
} from '@domain/order/__mocks__/Order'

const makePostgreSQLClient = () => {
	const PostgreSQLClientStub = jest.fn().mockImplementation(() => ({
		find: jest.fn().mockResolvedValue([orderGotMock]),
		findOne: jest.fn().mockResolvedValue(orderGotMock),
		save: jest.fn().mockResolvedValue(orderMock),
		update: jest.fn(),
		delete: jest.fn().mockResolvedValue(orderDeletedRawMock),
		getRepository: jest.fn().mockReturnThis(),
	}))

	return new PostgreSQLClientStub()
}

const makeSut = () => {
	const postgreSQLClientStub = makePostgreSQLClient()
	const sut = new OrderRepository(postgreSQLClientStub)
	return {
		sut,
		postgreSQLClientStub,
	}
}

const id = 'e3a70305-bb00-4019-b8f7-6d8ba7561849'
const externalId = 'efbcdc7d-7d95-4300-bbb3-956cbaa77e3f'

describe('OrderRepository', () => {
	it('should create an OrderRepository instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(OrderRepository)
	})

	describe('GetAll', () => {
		it('should return an empty array if does not exist any orders', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest.spyOn(postgreSQLClientStub, 'find').mockResolvedValueOnce([])

			const result = await sut.getAll()

			expect(result).toEqual([])
		})

		it('should return a list of orders', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findSpy = jest.spyOn(postgreSQLClientStub, 'find')

			const result = await sut.getAll()

			expect(findSpy).toBeCalled()
			expect(result).toEqual([orderMock])
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

		it('should returns a order successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findOneSpy = jest.spyOn(postgreSQLClientStub, 'findOne')

			const result = await sut.getOne(id)

			expect(findOneSpy).toBeCalledWith({
				where: { id },
				relations: { pickup: true, destination: true, items: true }
			})
			expect(result).toEqual(orderMock)
		})

		it('should throw if findOne method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findOneSpy = jest
				.spyOn(postgreSQLClientStub, 'findOne')
				.mockRejectedValue(new Error('some error'))

			const result = sut.getOne(id)

			expect(findOneSpy).toBeCalledWith({
				where: { id },
				relations: { pickup: true, destination: true, items: true }
			})
			await expect(result).rejects.toThrow()
		})
	})

	describe('GetOneByExternalId', () => {

		it('should returns an order successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findOneSpy = jest.spyOn(postgreSQLClientStub, 'findOne')

			const result = await sut.getOneByExternalId(externalId)

			expect(findOneSpy).toBeCalledWith({
				where: { externalId },
				relations: { pickup: true, destination: true, items: true }
			})
			expect(result).toEqual(orderMock)
		})

		it('should throw if findOne method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findOneSpy = jest
				.spyOn(postgreSQLClientStub, 'findOne')
				.mockRejectedValue(new Error('some error'))

			const result = sut.getOneByExternalId(externalId)

			expect(findOneSpy).toBeCalledWith({
				where: { externalId },
				relations: { pickup: true, destination: true, items: true }
			})
			await expect(result).rejects.toThrow()
		})
	})

	describe('Create', () => {
		it('should create an order successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const saveSpy = jest.spyOn(postgreSQLClientStub, 'save')

			const result = await sut.create(orderToCreateMock)

			expect(saveSpy).toBeCalledWith(orderToCreateMock)
			expect(result).toEqual(orderMock)
		})

		it('should throw if create method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const saveSpy = jest
				.spyOn(postgreSQLClientStub, 'save')
				.mockRejectedValue(new Error('some error'))

			const result = sut.create(orderToCreateMock)

			expect(saveSpy).toBeCalledWith(orderToCreateMock)
			await expect(result).rejects.toThrow()
		})
	})

	describe('Update', () => {
		it('should update an order successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const updateSpy = jest.spyOn(postgreSQLClientStub, 'update')
			const getOneSpy = jest.spyOn(sut, 'getOne').mockResolvedValueOnce(orderUpdatedMock)

			const result = await sut.update(id, orderToUpdateMock)

			expect(updateSpy).toBeCalledWith(
				{ id },
				orderToUpdateMock
			)
			expect(getOneSpy).toBeCalledWith(id)
			expect(result).toEqual(orderUpdatedMock)
		})

		it('should throw if update method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'update')
				.mockRejectedValue(new Error('some error'))

			const result = sut.update(id, orderToUpdateMock)

			await expect(result).rejects.toThrow()
		})
	})

	describe('Delete', () => {
		it('should delete an order successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const deleteSpy = jest.spyOn(postgreSQLClientStub, 'delete')

			const result = await sut.delete(id)

			expect(deleteSpy).toBeCalledWith({ id })
			expect(result).toEqual(true)
		})

		it('should return false if no order is deleted', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'delete')
				.mockResolvedValue(orderFailDeleteRawMock)

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
})

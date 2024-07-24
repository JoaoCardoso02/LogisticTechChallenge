import {
	orderMock,
	orderUpdatedMock,
} from '@domain/order/__mocks__/Order'
import OrderService from '@domain/order/services/OrderService'

const makeOrderRepositoryStub = () => {
	const OrderRepositoryStub = {
		getAll: jest.fn().mockResolvedValue([orderMock]),
		getOne: jest.fn().mockResolvedValue(orderMock),
		create: jest.fn().mockResolvedValue(orderMock),
		update: jest.fn().mockResolvedValue(orderUpdatedMock),
		delete: jest.fn().mockResolvedValue(true),
	}

	return OrderRepositoryStub
}

const makeSut = () => {
	const orderRepositoryStub = makeOrderRepositoryStub()
	const sut = new OrderService(orderRepositoryStub)

	return {
		sut,
		orderRepositoryStub,
	}
}

describe('OrderService', () => {
	it('should create an OrderService instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(OrderService)
	})

	it('should get all Orders successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findAll()

		expect(result).toEqual([orderMock])
	})

	it('should get one Orders by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findOne(1)

		expect(result).toEqual(orderMock)
	})

	it('should create one Order successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.create({
			weight: 20,
			type: 'fake type',
			originId: 1,
			destinationId: 2,
		})

		expect(result).toEqual(orderMock)
	})

	it('should update one Order by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.update(1, {
			weight: 30,
			type: 'fake type to update',
			originId: 1,
			destinationId: 2,
		})

		expect(result).toEqual(orderUpdatedMock)
	})

	it('should delete one Order successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.delete(1)

		expect(result).toBeTruthy()
	})
})

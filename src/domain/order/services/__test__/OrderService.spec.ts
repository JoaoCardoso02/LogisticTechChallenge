import {
	externalOrderMock,
	orderMock,
	orderToCreateMock,
	orderToUpdateMock,
	orderUpdatedMock,
} from '@domain/order/__mocks__/Order'
import OrderService from '@domain/order/services/OrderService'

const makeOrderRepositoryStub = () => {
	const OrderRepositoryStub = {
		getAll: jest.fn().mockResolvedValue([orderMock]),
		getOne: jest.fn().mockResolvedValue(orderMock),
		getOneByExternalId: jest.fn().mockResolvedValue(externalOrderMock),
		create: jest.fn().mockResolvedValue(orderMock),
		update: jest.fn().mockResolvedValue(orderUpdatedMock),
		delete: jest.fn().mockResolvedValue(true),
	}

	return OrderRepositoryStub
}

const makeExternalOrderRepositoryStub = () => {
	const ExternalOrderRepositoryStub = {
		getAll: jest.fn().mockResolvedValue([externalOrderMock])
	}

	return ExternalOrderRepositoryStub
}

const makeSut = () => {
	const orderRepositoryStub = makeOrderRepositoryStub()
	const externalOrderRepositoryStub = makeExternalOrderRepositoryStub()
	const sut = new OrderService(orderRepositoryStub, externalOrderRepositoryStub)

	return {
		sut,
		orderRepositoryStub,
	}
}

const id = '27a46982-4fea-4a53-a35e-fd0f86f770a2'
const externalId = 'd3ee5123-ce16-4bd4-94a1-11909f1025c9'

describe('OrderService', () => {
	it('should create an OrderService instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(OrderService)
	})

	it('should get all orders successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findAll()

		expect(result).toEqual([orderMock])
	})

	it('should get one order by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findOne(id)

		expect(result).toEqual(orderMock)
	})

	it('should get one order by external id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findOneByExternalId(externalId)

		expect(result).toEqual(externalOrderMock)
	})

	it('should fetch orders successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.fetch()

		expect(result).toEqual([externalOrderMock])
	})

	it('should create one order successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.create(orderToCreateMock)

		expect(result).toEqual(orderMock)
	})

	it('should update one order by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.update(id, orderToUpdateMock)

		expect(result).toEqual(orderUpdatedMock)
	})

	it('should delete one order successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.delete(id)

		expect(result).toBeTruthy()
	})
})

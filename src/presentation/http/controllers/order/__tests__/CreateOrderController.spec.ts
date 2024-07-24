import CreateOrderController from '@presentation/http/controllers/order/CreateOrderController'
import OrderAppService from '@application/order/OrderAppService'
import { orderMock } from '@domain/order/__mocks__/Order'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeOrderAppService = () => {
	const OrderAppServiceStub = {
		create: jest.fn(),
	} as unknown as OrderAppService

	return OrderAppServiceStub
}

const makeSut = () => {
	const orderAppServiceStub = makeOrderAppService()
	const sut = new CreateOrderController(orderAppServiceStub)

	return {
		sut,
		orderAppServiceStub,
	}
}

const request = {
	body: {
		type: orderMock.type,
		weight: orderMock.weight,
		originId: orderMock.originId,
		destinationId: orderMock.destinationId,
	},
} as unknown as IRequest

describe('CreateOrderController', () => {
	it('should create an order successfully', async () => {
		const { sut, orderAppServiceStub } = makeSut()

		const createSut = jest
			.spyOn(orderAppServiceStub, 'create')
			.mockResolvedValue(orderMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(orderMock)
		expect(createSut).toBeCalledWith(request.body)
	})

	it('should returns error if create method fails', async () => {
		const { sut, orderAppServiceStub } = makeSut()

		const createSut = jest
			.spyOn(orderAppServiceStub, 'create')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(createSut).toBeCalledWith(request.body)
	})
})

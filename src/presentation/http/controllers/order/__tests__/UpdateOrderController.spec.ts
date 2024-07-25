import UpdateOrderController from '@presentation/http/controllers/order/UpdateOrderController'
import OrderAppService from '@application/order/OrderAppService'
import { orderMock } from '@domain/order/__mocks__/Order'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeOrderAppService = () => {
	const OrderAppServiceStub = {
		update: jest.fn(),
	} as unknown as OrderAppService

	return OrderAppServiceStub
}

const makeSut = () => {
	const orderAppServiceStub = makeOrderAppService()
	const sut = new UpdateOrderController(orderAppServiceStub)

	return {
		sut,
		orderAppServiceStub,
	}
}

const request = {
	params: {
		id: '123',
	},
	body: {
		type: orderMock.type,
		weight: orderMock.weight,
		originId: orderMock.originId,
		destinationId: orderMock.destinationId,
	},
} as unknown as IRequest

describe('UpdateOrderController', () => {
	it('should update an order successfully', async () => {
		const { sut, orderAppServiceStub } = makeSut()

		const updateSut = jest
			.spyOn(orderAppServiceStub, 'update')
			.mockResolvedValue(orderMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(orderMock)
		expect(updateSut).toBeCalledWith(request.params.id, request.body)
	})

	it('should returns error if update method fails', async () => {
		const { sut, orderAppServiceStub } = makeSut()

		const updateSut = jest
			.spyOn(orderAppServiceStub, 'update')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(updateSut).toBeCalledWith(request.params.id, request.body)
	})
})

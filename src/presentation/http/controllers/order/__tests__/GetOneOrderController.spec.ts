import GetOneOrderController from '@presentation/http/controllers/order/GetOneOrderController'
import OrderAppService from '@application/order/OrderAppService'
import { orderMock } from '@domain/order/__mocks__/Order'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeOrderAppService = () => {
	const OrderAppServiceStub = {
		findOne: jest.fn(),
	} as unknown as OrderAppService

	return OrderAppServiceStub
}

const makeSut = () => {
	const orderAppServiceStub = makeOrderAppService()
	const sut = new GetOneOrderController(orderAppServiceStub)

	return {
		sut,
		orderAppServiceStub,
	}
}

const request = {
	params: {
		id: '123',
	},
} as unknown as IRequest

describe('GetOneOrderController', () => {
	it('should get one order successfully', async () => {
		const { sut, orderAppServiceStub } = makeSut()

		const findOneSut = jest
			.spyOn(orderAppServiceStub, 'findOne')
			.mockResolvedValue(orderMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(orderMock)
		expect(findOneSut).toBeCalledWith(request.params.id)
	})

	it('should returns error if find one method fails', async () => {
		const { sut, orderAppServiceStub } = makeSut()

		const findOneSut = jest
			.spyOn(orderAppServiceStub, 'findOne')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(findOneSut).toBeCalledWith(request.params.id)
	})
})

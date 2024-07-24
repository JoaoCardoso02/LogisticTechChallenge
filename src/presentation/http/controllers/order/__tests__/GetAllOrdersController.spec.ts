import GetAllOrdersController from '@presentation/http/controllers/order/GetAllOrdersController'
import OrderAppService from '@application/order/OrderAppService'
import { orderMock } from '@domain/order/__mocks__/Order'
import { InternalException } from '@shared/exceptions/InternalException'

const makeOrderAppService = () => {
	const OrderAppServiceStub = {
		findAll: jest.fn(),
	} as unknown as OrderAppService

	return OrderAppServiceStub
}

const makeSut = () => {
	const orderAppServiceStub = makeOrderAppService()
	const sut = new GetAllOrdersController(orderAppServiceStub)

	return {
		sut,
		orderAppServiceStub,
	}
}

describe('GetAllOrdersController', () => {
	it('should get all orders successfully', async () => {
		const { sut, orderAppServiceStub } = makeSut()

		const findAllSut = jest
			.spyOn(orderAppServiceStub, 'findAll')
			.mockResolvedValue([orderMock])

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute()

		expect(sendSut).toBeCalledWith([orderMock])
		expect(findAllSut).toBeCalled()
	})

	it('should returns error if find all method fails', async () => {
		const { sut, orderAppServiceStub } = makeSut()

		const findAllSut = jest
			.spyOn(orderAppServiceStub, 'findAll')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute()

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(findAllSut).toBeCalled()
	})
})

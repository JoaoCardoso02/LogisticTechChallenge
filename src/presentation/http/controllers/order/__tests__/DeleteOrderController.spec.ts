import DeleteOrderController from '@presentation/http/controllers/order/DeleteOrderController'
import OrderAppService from '@application/order/OrderAppService'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeOrderAppService = () => {
	const OrderAppServiceStub = {
		delete: jest.fn(),
	} as unknown as OrderAppService

	return OrderAppServiceStub
}

const makeSut = () => {
	const orderAppServiceStub = makeOrderAppService()
	const sut = new DeleteOrderController(orderAppServiceStub)

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

describe('DeleteOrderController', () => {
	it('should delete an order successfully', async () => {
		const { sut, orderAppServiceStub } = makeSut()

		const deleteSut = jest
			.spyOn(orderAppServiceStub, 'delete')
			.mockResolvedValue(true)

		const sendStatusSut = jest.spyOn(sut, 'sendStatus')

		await sut.execute(request)

		expect(sendStatusSut).toBeCalledWith(204)
		expect(deleteSut).toBeCalledWith(Number(request.params.id))
	})

	it('should returns error if delete method fails', async () => {
		const { sut, orderAppServiceStub } = makeSut()

		const deleteSut = jest
			.spyOn(orderAppServiceStub, 'delete')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(deleteSut).toBeCalledWith(Number(request.params.id))
	})
})

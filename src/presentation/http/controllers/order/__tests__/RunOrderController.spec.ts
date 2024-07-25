import RunOrderJobController from '@presentation/http/controllers/order/RunOrderJobController'
import OrderJobAppService from '@application/order/OrderJobAppService'
import { InternalException } from '@shared/exceptions/InternalException'

const makeOrderJobAppService = () => {
	const OrderAppServiceStub = {
		run: jest.fn(),
	} as unknown as OrderJobAppService

	return OrderAppServiceStub
}

const makeSut = () => {
	const orderJobAppServiceStub = makeOrderJobAppService()
	const sut = new RunOrderJobController(orderJobAppServiceStub)

	return {
		sut,
		orderJobAppServiceStub,
	}
}

describe('RunOrderJobController', () => {
	it('should run orders successfully', async () => {
		const { sut, orderJobAppServiceStub } = makeSut()

		const runSut = jest
			.spyOn(orderJobAppServiceStub, 'run')

		const sendStatusSut = jest.spyOn(sut, 'sendStatus')

		await sut.execute()

		expect(sendStatusSut).toBeCalledTimes(1)
		expect(runSut).toBeCalledTimes(1)
	})

	it('should returns error if run method fails', async () => {
		const { sut, orderJobAppServiceStub } = makeSut()

		const runSut = jest
			.spyOn(orderJobAppServiceStub, 'run')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute()

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(runSut).toBeCalledTimes(1)
	})
})

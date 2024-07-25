import GetOneLocationController from '@presentation/http/controllers/location/GetOneLocationController'
import LocationAppService from '@application/location/LocationAppService'
import { locationMock } from '@domain/location/__mocks__/Location'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeLocationAppService = () => {
	const LocationAppServiceStub = {
		findOne: jest.fn(),
	} as unknown as LocationAppService

	return LocationAppServiceStub
}

const makeSut = () => {
	const locationAppServiceStub = makeLocationAppService()
	const sut = new GetOneLocationController(locationAppServiceStub)

	return {
		sut,
		locationAppServiceStub,
	}
}

const request = {
	params: {
		id: '123',
	},
} as unknown as IRequest

describe('GetOneLocationController', () => {
	it('should get one location successfully', async () => {
		const { sut, locationAppServiceStub } = makeSut()

		const findOneSut = jest
			.spyOn(locationAppServiceStub, 'findOne')
			.mockResolvedValue(locationMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(locationMock)
		expect(findOneSut).toBeCalledWith(request.params.id)
	})

	it('should returns error if find one method fails', async () => {
		const { sut, locationAppServiceStub } = makeSut()

		const findOneSut = jest
			.spyOn(locationAppServiceStub, 'findOne')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(findOneSut).toBeCalledWith(request.params.id)
	})
})

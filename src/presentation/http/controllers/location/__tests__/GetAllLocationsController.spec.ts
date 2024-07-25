import GetAllLocationsController from '@presentation/http/controllers/location/GetAllLocationsController'
import LocationAppService from '@application/location/LocationAppService'
import { locationMock } from '@domain/location/__mocks__/Location'
import { InternalException } from '@shared/exceptions/InternalException'

const makeLocationAppService = () => {
	const LocationAppServiceStub = {
		findAll: jest.fn(),
	} as unknown as LocationAppService

	return LocationAppServiceStub
}

const makeSut = () => {
	const locationAppServiceStub = makeLocationAppService()
	const sut = new GetAllLocationsController(locationAppServiceStub)

	return {
		sut,
		locationAppServiceStub,
	}
}

describe('GetAllLocationsController', () => {
	it('should get all locations successfully', async () => {
		const { sut, locationAppServiceStub } = makeSut()

		const findAllSut = jest
			.spyOn(locationAppServiceStub, 'findAll')
			.mockResolvedValue([locationMock])

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute()

		expect(sendSut).toBeCalledWith([locationMock])
		expect(findAllSut).toBeCalled()
	})

	it('should returns error if find all method fails', async () => {
		const { sut, locationAppServiceStub } = makeSut()

		const findAllSut = jest
			.spyOn(locationAppServiceStub, 'findAll')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute()

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(findAllSut).toBeCalled()
	})
})

import CreateLocationController from '@presentation/http/controllers/location/CreateLocationController'
import LocationAppService from '@application/location/LocationAppService'
import { locationMock, locationToCreateMock } from '@domain/location/__mocks__/Location'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeLocationAppService = () => {
	const LocationAppServiceStub = {
		create: jest.fn(),
	} as unknown as LocationAppService

	return LocationAppServiceStub
}

const makeSut = () => {
	const locationAppServiceStub = makeLocationAppService()
	const sut = new CreateLocationController(locationAppServiceStub)

	return {
		sut,
		locationAppServiceStub,
	}
}

const request = {
	body: {
		address: locationToCreateMock.address,
		contactName: locationToCreateMock.contactName,
		contactPhone: locationToCreateMock.contactPhone,
	},
} as unknown as IRequest

describe('CreateLocationController', () => {
	it('should create an location successfully', async () => {
		const { sut, locationAppServiceStub } = makeSut()

		const createSut = jest
			.spyOn(locationAppServiceStub, 'create')
			.mockResolvedValue(locationMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(locationMock)
		expect(createSut).toBeCalledWith(request.body)
	})

	it('should returns error if create method fails', async () => {
		const { sut, locationAppServiceStub } = makeSut()

		const createSut = jest
			.spyOn(locationAppServiceStub, 'create')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(createSut).toBeCalledWith(request.body)
	})
})

import UpdateLocationController from '@presentation/http/controllers/location/UpdateLocationController'
import LocationAppService from '@application/location/LocationAppService'
import { locationMock, locationToUpdateMock } from '@domain/location/__mocks__/Location'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeLocationAppService = () => {
	const LocationAppServiceStub = {
		update: jest.fn(),
	} as unknown as LocationAppService

	return LocationAppServiceStub
}

const makeSut = () => {
	const locationAppServiceStub = makeLocationAppService()
	const sut = new UpdateLocationController(locationAppServiceStub)

	return {
		sut,
		locationAppServiceStub,
	}
}

const request = {
	params: {
		id: '123',
	},
	body: {
		address: locationToUpdateMock.address,
		contactName: locationToUpdateMock.contactName,
		contactPhone: locationToUpdateMock.contactPhone,
	},
} as unknown as IRequest

describe('UpdateLocationController', () => {
	it('should update an location successfully', async () => {
		const { sut, locationAppServiceStub } = makeSut()

		const updateSut = jest
			.spyOn(locationAppServiceStub, 'update')
			.mockResolvedValue(locationMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(locationMock)
		expect(updateSut).toBeCalledWith(request.params.id, request.body)
	})

	it('should returns error if update method fails', async () => {
		const { sut, locationAppServiceStub } = makeSut()

		const updateSut = jest
			.spyOn(locationAppServiceStub, 'update')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(updateSut).toBeCalledWith(request.params.id, request.body)
	})
})

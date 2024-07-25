import DeleteLocationController from '@presentation/http/controllers/location/DeleteLocationController'
import LocationAppService from '@application/location/LocationAppService'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeLocationAppService = () => {
	const LocationAppServiceStub = {
		delete: jest.fn(),
	} as unknown as LocationAppService

	return LocationAppServiceStub
}

const makeSut = () => {
	const locationAppServiceStub = makeLocationAppService()
	const sut = new DeleteLocationController(locationAppServiceStub)

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

describe('DeleteLocationController', () => {
	it('should delete an location successfully', async () => {
		const { sut, locationAppServiceStub } = makeSut()

		const deleteSut = jest
			.spyOn(locationAppServiceStub, 'delete')
			.mockResolvedValue(true)

		const sendStatusSut = jest.spyOn(sut, 'sendStatus')

		await sut.execute(request)

		expect(sendStatusSut).toBeCalledWith(204)
		expect(deleteSut).toBeCalledWith(request.params.id)
	})

	it('should returns error if delete method fails', async () => {
		const { sut, locationAppServiceStub } = makeSut()

		const deleteSut = jest
			.spyOn(locationAppServiceStub, 'delete')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(deleteSut).toBeCalledWith(request.params.id)
	})
})

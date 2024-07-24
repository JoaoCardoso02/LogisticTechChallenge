import {
	locationMock,
	locationToCreateMock,
	locationToUpdateMock,
	locationUpdatedMock,
} from '@domain/location/__mocks__/Location'
import LocationService from '@domain/location/services/LocationService'

const makeLocationRepositoryStub = () => {
	const LocationRepositoryStub = {
		getAll: jest.fn().mockResolvedValue([locationMock]),
		getOne: jest.fn().mockResolvedValue(locationMock),
		create: jest.fn().mockResolvedValue(locationMock),
		update: jest.fn().mockResolvedValue(locationUpdatedMock),
		delete: jest.fn().mockResolvedValue(true),
	}

	return LocationRepositoryStub
}

const makeSut = () => {
	const locationRepositoryStub = makeLocationRepositoryStub()
	const sut = new LocationService(locationRepositoryStub)

	return {
		sut,
		locationRepositoryStub,
	}
}

describe('LocationService', () => {
	it('should create an LocationService instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(LocationService)
	})

	it('should get all Locations successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findAll()

		expect(result).toEqual([locationMock])
	})

	it('should get one Locations by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findOne('uuid')

		expect(result).toEqual(locationMock)
	})

	it('should create one Location successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.create(locationToCreateMock)

		expect(result).toEqual(locationMock)
	})

	it('should update one Location by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.update('uuid', locationToUpdateMock)

		expect(result).toEqual(locationUpdatedMock)
	})

	it('should delete one Location successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.delete('uuid')

		expect(result).toBeTruthy()
	})
})

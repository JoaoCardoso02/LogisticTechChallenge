import LocationRepository from '@domain/location/infrastructure/LocationRepository'
import {
	locationMock,
	locationGotMock,
	locationToCreateMock,
	locationToUpdateMock,
	locationUpdatedMock,
	locationDeletedRawMock,
	locationFailDeleteRawMock,
} from '@domain/location/__mocks__/Location'

const makePostgreSQLClient = () => {
	const PostgreSQLClientStub = jest.fn().mockImplementation(() => ({
		find: jest.fn().mockResolvedValue([locationGotMock]),
		findOneBy: jest.fn().mockResolvedValue(locationGotMock),
		save: jest.fn().mockResolvedValue(locationMock),
		update: jest.fn(),
		delete: jest.fn().mockResolvedValue(locationDeletedRawMock),
		getRepository: jest.fn().mockReturnThis(),
	}))

	return new PostgreSQLClientStub()
}

const makeSut = () => {
	const postgreSQLClientStub = makePostgreSQLClient()
	const sut = new LocationRepository(postgreSQLClientStub)
	return {
		sut,
		postgreSQLClientStub,
	}
}

const id = 'uuid'
id;

describe('LocationRepository', () => {
	it('should create an LocationRepository instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(LocationRepository)
	})

	describe('GetAll', () => {
		it('should return an empty array if does not exist any locations', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest.spyOn(postgreSQLClientStub, 'find').mockResolvedValueOnce([])

			const result = await sut.getAll()

			expect(result).toEqual([])
		})

		it('should return a list of locations', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findSpy = jest.spyOn(postgreSQLClientStub, 'find')

			const result = await sut.getAll()

			expect(findSpy).toBeCalled()
			expect(result).toEqual([locationMock])
		})

		it('should throw if find method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findSpy = jest
				.spyOn(postgreSQLClientStub, 'find')
				.mockRejectedValue(new Error('some error'))

			const result = sut.getAll()

			expect(findSpy).toBeCalled()
			await expect(result).rejects.toThrow()
		})
	})

	describe('GetOne', () => {

		it('should create an location and returns it', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findOneBySpy = jest.spyOn(postgreSQLClientStub, 'findOneBy')

			const result = await sut.getOne(id)

			expect(findOneBySpy).toBeCalledWith({ id })
			expect(result).toEqual(locationMock)
		})

		it('should throw if findOne method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findOneBySpy = jest
				.spyOn(postgreSQLClientStub, 'findOneBy')
				.mockRejectedValue(new Error('some error'))

			const result = sut.getOne(id)

			expect(findOneBySpy).toBeCalledWith({ id })
			await expect(result).rejects.toThrow()
		})
	})

	describe('Create', () => {
		it('should create an location successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const saveSpy = jest.spyOn(postgreSQLClientStub, 'save')

			const result = await sut.create(locationToCreateMock)

			expect(saveSpy).toBeCalledWith(locationToCreateMock)
			expect(result).toEqual(locationMock)
		})

		it('should throw if create method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const saveSpy = jest
				.spyOn(postgreSQLClientStub, 'save')
				.mockRejectedValue(new Error('some error'))

			const result = sut.create(locationToCreateMock)

			expect(saveSpy).toBeCalledWith(locationToCreateMock)
			await expect(result).rejects.toThrow()
		})
	})

	describe('Update', () => {
		it('should update an location successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const updateSpy = jest.spyOn(postgreSQLClientStub, 'update')
			const getOneSpy = jest.spyOn(sut, 'getOne').mockResolvedValueOnce(locationUpdatedMock)

			const result = await sut.update(id, locationToUpdateMock)

			expect(updateSpy).toBeCalledWith(
				{ id },
				locationToUpdateMock
			)
			expect(getOneSpy).toBeCalledWith(id)
			expect(result).toEqual(locationUpdatedMock)
		})

		it('should throw if update method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'update')
				.mockRejectedValue(new Error('some error'))

			const result = sut.update(id, locationToUpdateMock)

			await expect(result).rejects.toThrow()
		})
	})

	describe('Delete', () => {
		it('should delete an location successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const deleteSpy = jest.spyOn(postgreSQLClientStub, 'delete')

			const result = await sut.delete(id)

			expect(deleteSpy).toBeCalledWith({ id })
			expect(result).toEqual(true)
		})

		it('should return false if no location is deleted', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'delete')
				.mockResolvedValue(locationFailDeleteRawMock)

			const result = await sut.delete(id)

			expect(result).toEqual(false)
		})

		it('should throw if delete method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'delete')
				.mockRejectedValue(new Error('some error'))

			const result = sut.delete(id)

			await expect(result).rejects.toThrow()
		})
	})
})

import ExampleRepository from '@domain/example/infrastructure/ExampleRepository'
import {
	exampleMock,
	exampleGotMock,
	exampleToCreateMock,
	exampleToUpdateMock,
	exampleUpdatedMock,
	exampleDeletedRawMock,
	exampleFailDeleteRawMock,
} from '@domain/example/__mocks__/Example'

const makePostgreSQLClient = () => {
	const PostgreSQLClientStub = jest.fn().mockImplementation(() => ({
		find: jest.fn().mockResolvedValue([exampleGotMock]),
		findOneBy: jest.fn().mockResolvedValue(exampleGotMock),
		save: jest.fn().mockResolvedValue(exampleMock),
		update: jest.fn(),
		delete: jest.fn().mockResolvedValue(exampleDeletedRawMock),
		getRepository: jest.fn().mockReturnThis(),
	}))

	return new PostgreSQLClientStub()
}

const makeSut = () => {
	const postgreSQLClientStub = makePostgreSQLClient()
	const sut = new ExampleRepository(postgreSQLClientStub)
	return {
		sut,
		postgreSQLClientStub,
	}
}

const id = 1
id;

describe('ExampleRepository', () => {
	it('should create an ExampleRepository instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(ExampleRepository)
	})

	describe('GetAll', () => {
		it('should return an empty array if does not exist any examples', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest.spyOn(postgreSQLClientStub, 'find').mockResolvedValueOnce([])

			const result = await sut.getAll()

			expect(result).toEqual([])
		})

		it('should return a list of examples', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findSpy = jest.spyOn(postgreSQLClientStub, 'find')

			const result = await sut.getAll()

			expect(findSpy).toBeCalled()
			expect(result).toEqual([exampleMock])
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

		it('should create an example and returns it', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const findOneBySpy = jest.spyOn(postgreSQLClientStub, 'findOneBy')

			const result = await sut.getOne(id)

			expect(findOneBySpy).toBeCalledWith({ id })
			expect(result).toEqual(exampleMock)
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
		it('should create an example successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const saveSpy = jest.spyOn(postgreSQLClientStub, 'save')

			const result = await sut.create(exampleToCreateMock)

			expect(saveSpy).toBeCalledWith(exampleToCreateMock)
			expect(result).toEqual(exampleMock)
		})

		it('should throw if create method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const saveSpy = jest
				.spyOn(postgreSQLClientStub, 'save')
				.mockRejectedValue(new Error('some error'))

			const result = sut.create(exampleToCreateMock)

			expect(saveSpy).toBeCalledWith(exampleToCreateMock)
			await expect(result).rejects.toThrow()
		})
	})

	describe('Update', () => {
		it('should update an example successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const updateSpy = jest.spyOn(postgreSQLClientStub, 'update')
			const getOneSpy = jest.spyOn(sut, 'getOne').mockResolvedValueOnce(exampleUpdatedMock)

			const result = await sut.update(id, exampleToUpdateMock)

			expect(updateSpy).toBeCalledWith(
				{ id },
				exampleToUpdateMock
			)
			expect(getOneSpy).toBeCalledWith(id)
			expect(result).toEqual(exampleUpdatedMock)
		})

		it('should throw if update method fails', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'update')
				.mockRejectedValue(new Error('some error'))

			const result = sut.update(id, exampleToUpdateMock)

			await expect(result).rejects.toThrow()
		})
	})

	describe('Delete', () => {
		it('should delete an example successfully', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			const deleteSpy = jest.spyOn(postgreSQLClientStub, 'delete')

			const result = await sut.delete(id)

			expect(deleteSpy).toBeCalledWith({ id })
			expect(result).toEqual(true)
		})

		it('should return false if no example is deleted', async () => {
			const { sut, postgreSQLClientStub } = makeSut()

			jest
				.spyOn(postgreSQLClientStub, 'delete')
				.mockResolvedValue(exampleFailDeleteRawMock)

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

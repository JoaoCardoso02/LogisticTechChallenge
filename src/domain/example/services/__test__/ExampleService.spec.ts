import {
	exampleMock,
	exampleUpdatedMock,
} from '@domain/example/__mocks__/Example'
import ExampleService from '@domain/example/services/ExampleService'

const makeExampleRepositoryStub = () => {
	const ExampleRepositoryStub = {
		getAll: jest.fn().mockResolvedValue([exampleMock]),
		getOne: jest.fn().mockResolvedValue(exampleMock),
		create: jest.fn().mockResolvedValue(exampleMock),
		update: jest.fn().mockResolvedValue(exampleUpdatedMock),
		delete: jest.fn().mockResolvedValue(true),
	}

	return ExampleRepositoryStub
}

const makeSut = () => {
	const exampleRepositoryStub = makeExampleRepositoryStub()
	const sut = new ExampleService(exampleRepositoryStub)

	return {
		sut,
		exampleRepositoryStub,
	}
}

describe('ExampleService', () => {
	it('should create an ExampleService instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(ExampleService)
	})

	it('should get all Examples successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findAll()

		expect(result).toEqual([exampleMock])
	})

	it('should get one Examples by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.findOne(1)

		expect(result).toEqual(exampleMock)
	})

	it('should create one Example successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.create({
			age: 20,
			name: 'fake name',
		})

		expect(result).toEqual(exampleMock)
	})

	it('should update one Example by id successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.update(1, {
			age: 30,
			name: 'fake name to update',
		})

		expect(result).toEqual(exampleUpdatedMock)
	})

	it('should delete one Example successfully', async () => {
		const { sut } = makeSut()

		const result = await sut.delete(1)

		expect(result).toBeTruthy()
	})
})

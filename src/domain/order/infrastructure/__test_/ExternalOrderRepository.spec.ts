import ExternalOrderRepository from '@domain/order/infrastructure/ExternalOrderRepository'
import {
	externalOrderMock,
} from '@domain/order/__mocks__/Order'

const makeHttpClient = () => {
	const HttpClientStub = jest.fn().mockImplementation(() => ({
		get: jest.fn().mockResolvedValue([]),
	}))

	return new HttpClientStub()
}

const makeSut = () => {
	const httpClientStub = makeHttpClient()
	const sut = new ExternalOrderRepository(httpClientStub)
	return {
		sut,
		httpClientStub,
	}
}

describe('ExternalOrderRepository', () => {
	it('should create an ExternalOrderRepository instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(ExternalOrderRepository)
	})

	describe('GetAll', () => {
		it('should return an empty array if does not exist any orders', async () => {
			const { sut, httpClientStub } = makeSut()

			jest.spyOn(httpClientStub, 'get').mockResolvedValueOnce([])

			const result = await sut.getAll()

			expect(result).toEqual([])
		})

		it('should return a list of orders', async () => {
			const { sut, httpClientStub } = makeSut()

			const findSpy = jest.spyOn(httpClientStub, 'get').mockResolvedValueOnce([externalOrderMock])

			const result = await sut.getAll()

			expect(findSpy).toBeCalled()
			expect(result).toEqual([externalOrderMock])
		})

		it('should throw if get method fails', async () => {
			const { sut, httpClientStub } = makeSut()

			const findSpy = jest
				.spyOn(httpClientStub, 'get')
				.mockRejectedValue(new Error('some error'))

			const result = sut.getAll()

			expect(findSpy).toBeCalled()
			await expect(result).rejects.toThrow()
		})
	})
})

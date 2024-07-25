import CreateProductController from '@presentation/http/controllers/product/CreateProductController'
import ProductAppService from '@application/product/ProductAppService'
import { productMock, productToCreateMock } from '@domain/product/__mocks__/Product'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeProductAppService = () => {
	const ProductAppServiceStub = {
		create: jest.fn(),
	} as unknown as ProductAppService

	return ProductAppServiceStub
}

const makeSut = () => {
	const productAppServiceStub = makeProductAppService()
	const sut = new CreateProductController(productAppServiceStub)

	return {
		sut,
		productAppServiceStub,
	}
}

const request = {
	body: {
		type: productToCreateMock,
		length: productToCreateMock,
		width: productToCreateMock,
		height: productToCreateMock,
		weight: productToCreateMock,
		orderId: productToCreateMock,
	},
} as unknown as IRequest

describe('CreateProductController', () => {
	it('should create an product successfully', async () => {
		const { sut, productAppServiceStub } = makeSut()

		const createSut = jest
			.spyOn(productAppServiceStub, 'create')
			.mockResolvedValue(productMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(productMock)
		expect(createSut).toBeCalledWith(request.body)
	})

	it('should returns error if create method fails', async () => {
		const { sut, productAppServiceStub } = makeSut()

		const createSut = jest
			.spyOn(productAppServiceStub, 'create')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(createSut).toBeCalledWith(request.body)
	})
})

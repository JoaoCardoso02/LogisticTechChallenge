import GetAllProductsController from '@presentation/http/controllers/product/GetAllProductsController'
import ProductAppService from '@application/product/ProductAppService'
import { productMock } from '@domain/product/__mocks__/Product'
import { InternalException } from '@shared/exceptions/InternalException'

const makeProductAppService = () => {
	const ProductAppServiceStub = {
		findAll: jest.fn(),
	} as unknown as ProductAppService

	return ProductAppServiceStub
}

const makeSut = () => {
	const productAppServiceStub = makeProductAppService()
	const sut = new GetAllProductsController(productAppServiceStub)

	return {
		sut,
		productAppServiceStub,
	}
}

describe('GetAllProductsController', () => {
	it('should get all products successfully', async () => {
		const { sut, productAppServiceStub } = makeSut()

		const findAllSut = jest
			.spyOn(productAppServiceStub, 'findAll')
			.mockResolvedValue([productMock])

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute()

		expect(sendSut).toBeCalledWith([productMock])
		expect(findAllSut).toBeCalled()
	})

	it('should returns error if find all method fails', async () => {
		const { sut, productAppServiceStub } = makeSut()

		const findAllSut = jest
			.spyOn(productAppServiceStub, 'findAll')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute()

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(findAllSut).toBeCalled()
	})
})

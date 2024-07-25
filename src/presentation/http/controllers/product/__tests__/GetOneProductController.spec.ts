import GetOneProductController from '@presentation/http/controllers/product/GetOneProductController'
import ProductAppService from '@application/product/ProductAppService'
import { productMock } from '@domain/product/__mocks__/Product'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeProductAppService = () => {
	const ProductAppServiceStub = {
		findOne: jest.fn(),
	} as unknown as ProductAppService

	return ProductAppServiceStub
}

const makeSut = () => {
	const productAppServiceStub = makeProductAppService()
	const sut = new GetOneProductController(productAppServiceStub)

	return {
		sut,
		productAppServiceStub,
	}
}

const request = {
	params: {
		id: '123',
	},
} as unknown as IRequest

describe('GetOneProductController', () => {
	it('should get one product successfully', async () => {
		const { sut, productAppServiceStub } = makeSut()

		const findOneSut = jest
			.spyOn(productAppServiceStub, 'findOne')
			.mockResolvedValue(productMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(productMock)
		expect(findOneSut).toBeCalledWith(request.params.id)
	})

	it('should returns error if find one method fails', async () => {
		const { sut, productAppServiceStub } = makeSut()

		const findOneSut = jest
			.spyOn(productAppServiceStub, 'findOne')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(findOneSut).toBeCalledWith(request.params.id)
	})
})

import UpdateProductController from '@presentation/http/controllers/product/UpdateProductController'
import ProductAppService from '@application/product/ProductAppService'
import { productMock, productToUpdateMock } from '@domain/product/__mocks__/Product'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeProductAppService = () => {
	const ProductAppServiceStub = {
		update: jest.fn(),
	} as unknown as ProductAppService

	return ProductAppServiceStub
}

const makeSut = () => {
	const productAppServiceStub = makeProductAppService()
	const sut = new UpdateProductController(productAppServiceStub)

	return {
		sut,
		productAppServiceStub,
	}
}

const request = {
	params: {
		id: '123',
	},
	body: {
		type: productToUpdateMock,
		length: productToUpdateMock,
		width: productToUpdateMock,
		height: productToUpdateMock,
		weight: productToUpdateMock,
		orderId: productToUpdateMock,
	},
} as unknown as IRequest

describe('UpdateProductController', () => {
	it('should update an product successfully', async () => {
		const { sut, productAppServiceStub } = makeSut()

		const updateSut = jest
			.spyOn(productAppServiceStub, 'update')
			.mockResolvedValue(productMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(productMock)
		expect(updateSut).toBeCalledWith(request.params.id, request.body)
	})

	it('should returns error if update method fails', async () => {
		const { sut, productAppServiceStub } = makeSut()

		const updateSut = jest
			.spyOn(productAppServiceStub, 'update')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(updateSut).toBeCalledWith(request.params.id, request.body)
	})
})

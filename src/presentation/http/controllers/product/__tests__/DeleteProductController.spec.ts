import DeleteProductController from '@presentation/http/controllers/product/DeleteProductController'
import ProductAppService from '@application/product/ProductAppService'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeProductAppService = () => {
	const ProductAppServiceStub = {
		delete: jest.fn(),
	} as unknown as ProductAppService

	return ProductAppServiceStub
}

const makeSut = () => {
	const productAppServiceStub = makeProductAppService()
	const sut = new DeleteProductController(productAppServiceStub)

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

describe('DeleteProductController', () => {
	it('should delete an product successfully', async () => {
		const { sut, productAppServiceStub } = makeSut()

		const deleteSut = jest
			.spyOn(productAppServiceStub, 'delete')
			.mockResolvedValue(true)

		const sendStatusSut = jest.spyOn(sut, 'sendStatus')

		await sut.execute(request)

		expect(sendStatusSut).toBeCalledWith(204)
		expect(deleteSut).toBeCalledWith(request.params.id)
	})

	it('should returns error if delete method fails', async () => {
		const { sut, productAppServiceStub } = makeSut()

		const deleteSut = jest
			.spyOn(productAppServiceStub, 'delete')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(deleteSut).toBeCalledWith(request.params.id)
	})
})

import OrderJobAppService from '@application/order/OrderJobAppService'
import LocationService from '@domain/location/services/LocationService';
import { locationMock } from '@domain/location/__mocks__/Location';
import OrderService from '@domain/order/services/OrderService';
import { externalOrderMock } from '@domain/order/__mocks__/Order';
import ProductService from '@domain/product/services/ProductService';
// import { productMock } from '@domain/product/__mocks__/Product';


const makeOrderService = () => {
    const OrderServiceStub = {
        fetch: jest.fn().mockResolvedValue([externalOrderMock]),
        findOneByExternalId: jest.fn().mockResolvedValue(externalOrderMock),
        create: jest.fn().mockResolvedValue(externalOrderMock),
        update: jest.fn().mockResolvedValue(externalOrderMock),
    } as unknown as OrderService

    return OrderServiceStub;
}

const makeLocationService = () => {
    const LocationServiceStub = {
        create: jest.fn().mockResolvedValue(locationMock),
        update: jest.fn().mockResolvedValue(locationMock),
    } as unknown as LocationService

    return LocationServiceStub;
}

const makeProductService = () => {
    const ProductServiceStub = {
        deleteByOrderId: jest.fn(),
        createMany: jest.fn(),
    } as unknown as ProductService

    return ProductServiceStub;
}

const makeSut = () => {
	const orderServiceStub = makeOrderService()
    const locationServiceStub = makeLocationService()
    const productServiceStub = makeProductService()
	const sut = new OrderJobAppService(
        orderServiceStub,
        locationServiceStub,
        productServiceStub,
    )

	return {
		sut,
		orderServiceStub,
        locationServiceStub,
        productServiceStub,
	}
}

describe('RunOrderJobController', () => {
    it('should not handle any order if no external orders were found', async () => {
		const { sut, orderServiceStub } = makeSut()

		const fetchSut = jest
			.spyOn(orderServiceStub, 'fetch')
            .mockResolvedValueOnce([])

		const findOneByExternalIdSut = jest
            .spyOn(orderServiceStub, 'findOneByExternalId')

		await sut.run()

		expect(findOneByExternalIdSut).not.toBeCalled()
		expect(fetchSut).toBeCalledTimes(1)
	})

    it('should create a order if a external order is returned but not finded by external id', async () => {
		const { sut, orderServiceStub, locationServiceStub } = makeSut()

		const fetchSut = jest
			.spyOn(orderServiceStub, 'fetch')

		const findOneByExternalIdSut = jest
            .spyOn(orderServiceStub, 'findOneByExternalId')
            .mockResolvedValueOnce(null)
        
        const createLocationSut = jest
            .spyOn(locationServiceStub, 'create')
        
        const createOrderSut = jest
            .spyOn(orderServiceStub, 'create')

		await sut.run()

		expect(fetchSut).toBeCalledTimes(1)
		expect(findOneByExternalIdSut).toBeCalled()
		expect(findOneByExternalIdSut).toBeCalledWith(externalOrderMock.id)
		expect(createLocationSut).toBeCalledWith(externalOrderMock.pickup)
		expect(createLocationSut).toBeCalledWith(externalOrderMock.destination)
		expect(createOrderSut).toBeCalledWith({
            type: externalOrderMock.type,
			weight: externalOrderMock.weight,
			originId: externalOrderMock.pickup.id,
			destinationId: externalOrderMock.destination.id,
			externalId: externalOrderMock.id
        })
	})

    it('should update a order if a external order is returned and it\'s finded by external id', async () => {
		const { sut, orderServiceStub, locationServiceStub } = makeSut()

		const fetchSut = jest
			.spyOn(orderServiceStub, 'fetch')

		const findOneByExternalIdSut = jest
            .spyOn(orderServiceStub, 'findOneByExternalId')
        
        const updateLocationSut = jest
            .spyOn(locationServiceStub, 'update')
        
        const updateOrderSut = jest
            .spyOn(orderServiceStub, 'update')

		await sut.run()

		expect(fetchSut).toBeCalledTimes(1)
		expect(findOneByExternalIdSut).toBeCalled()
		expect(findOneByExternalIdSut).toBeCalledWith(externalOrderMock.id)
		expect(updateLocationSut).toBeCalledWith(externalOrderMock.originId, externalOrderMock.pickup)
		expect(updateLocationSut).toBeCalledWith(externalOrderMock.destinationId, externalOrderMock.destination)
		expect(updateOrderSut).toBeCalledWith(
            externalOrderMock.id,
            {
                type: externalOrderMock.type,
                weight: externalOrderMock.weight,
                originId: externalOrderMock.pickup.id,
                destinationId: externalOrderMock.destination.id
            }
        )
	})
})

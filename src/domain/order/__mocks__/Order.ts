import { locationMock } from '@domain/location/__mocks__/Location'
import { productMock } from '@domain/product/__mocks__/Product'

export const orderMock = {
	id: '27a46982-4fea-4a53-a35e-fd0f86f770a2',
	weight: 20,
	type: 'fake type',
	originId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	destinationId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	pickup: locationMock,
	destination: locationMock,
	items: [productMock],
	externalId: null
}

export const orderGotMock = {
	id: '27a46982-4fea-4a53-a35e-fd0f86f770a2',
	weight: 20,
	type: 'fake type',
	originId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	destinationId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	pickup: locationMock,
	destination: locationMock,
	items: [productMock],
	externalId: null
}

export const externalOrderMock = {
	id: '27a46982-4fea-4a53-a35e-fd0f86f770a2',
	weight: 20,
	type: 'fake type',
	originId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	destinationId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	pickup: locationMock,
	destination: locationMock,
	items: [productMock],
	externalId: 'd3ee5123-ce16-4bd4-94a1-11909f1025c9'
}

export const orderUpdatedMock = {
	id: '27a46982-4fea-4a53-a35e-fd0f86f770a2',
	weight: 30,
	type: 'fake type to update',
	originId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	destinationId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	pickup: locationMock,
	destination: locationMock,
	items: [productMock],
	externalId: null
}

export const orderToUpdateMock = {
	weight: 30,
	type: 'fake type to update',
	originId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	destinationId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
}

export const orderToCreateMock = {
	weight: 30,
	type: 'fake type to update',
	originId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	destinationId: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
}

export const orderDeletedRawMock = {
	affected: 1,
}

export const orderFailDeleteRawMock = {
	affected: 0,
}

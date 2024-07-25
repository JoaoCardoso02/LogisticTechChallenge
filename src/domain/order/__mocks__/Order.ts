import { locationMock } from '@domain/location/__mocks__/Location'

export const orderMock = {
	id: 'uuid',
	weight: 20,
	type: 'fake type',
	originId: "3a27425c-5f6d-4ae3-a458-cfb9843521f9",
	destinationId: "3a27425c-5f6d-4ae3-a458-cfb9843521f9",
	origin: locationMock,
	destination: locationMock,
}

export const orderGotMock = {
	id: 'uuid',
	weight: 20,
	type: 'fake type',
	originId: "3a27425c-5f6d-4ae3-a458-cfb9843521f9",
	destinationId: "3a27425c-5f6d-4ae3-a458-cfb9843521f9",
	origin: locationMock,
	destination: locationMock,
}

export const orderUpdatedMock = {
	id: 'uuid',
	weight: 30,
	type: 'fake type to update',
	originId: "3a27425c-5f6d-4ae3-a458-cfb9843521f9",
	destinationId: "3a27425c-5f6d-4ae3-a458-cfb9843521f9",
	origin: locationMock,
	destination: locationMock,
}

export const orderToUpdateMock = {
	weight: 30,
	type: 'fake type to update',
	originId: "3a27425c-5f6d-4ae3-a458-cfb9843521f9",
	destinationId: "3a27425c-5f6d-4ae3-a458-cfb9843521f9",
}

export const orderToCreateMock = {
	weight: 30,
	type: 'fake type to update',
	originId: "3a27425c-5f6d-4ae3-a458-cfb9843521f9",
	destinationId: "3a27425c-5f6d-4ae3-a458-cfb9843521f9",
}

export const orderDeletedRawMock = {
	affected: 1,
}

export const orderFailDeleteRawMock = {
	affected: 0,
}

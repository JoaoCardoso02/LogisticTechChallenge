import OrderEntity from "@domain/order/entities/Order"

export const productMock = {
	id: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	type: 'PALLET',
	length: 10,
	width: 20,
	height: 30,
	weight: 40,
	orderId: '211ec8e5-fa11-4290-b15b-cc24cd804b5f',
	order: {} as OrderEntity
}

export const productGotMock = {
	id: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	type: 'PALLET',
	length: 10,
	width: 20,
	height: 30,
	weight: 40,
	orderId: '211ec8e5-fa11-4290-b15b-cc24cd804b5f',
	order: {} as OrderEntity
}

export const productUpdatedMock = {
	id: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	type: 'PARCEL',
	length: 20,
	width: 30,
	height: 40,
	weight: 50,
	orderId: '211ec8e5-fa11-4290-b15b-cc24cd804b5f',
	order: {} as OrderEntity
}

export const productToUpdateMock = {
	id: '3a27425c-5f6d-4ae3-a458-cfb9843521f9',
	type: 'PARCEL',
	length: 20,
	width: 30,
	height: 40,
	weight: 50,
	orderId: '211ec8e5-fa11-4290-b15b-cc24cd804b5f'
}

export const productToCreateMock = {
	type: 'PALLET',
	length: 10,
	width: 20,
	height: 30,
	weight: 40,
	orderId: '211ec8e5-fa11-4290-b15b-cc24cd804b5f',
}

export const productDeletedRawMock = {
	affected: 1,
}

export const productFailDeleteRawMock = {
	affected: 0,
}

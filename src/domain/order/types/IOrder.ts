import { IProduct } from "@domain/product/types/IProduct"

export interface IOrder {
	id?: string
	type: string
	weight: number
	originId: string
	destinationId: string
	externalId?: string
	items: IProduct[]
}

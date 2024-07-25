import { ILocation } from '@domain/location/types/ILocation'
import { IOrder } from './IOrder'

export type IExternalOrder = IOrder & {
    id: string,
    originId?: string,
    destinationId?: string,
    pickup: Omit<ILocation, 'id'>,
    destination: Omit<ILocation, 'id'>,
}

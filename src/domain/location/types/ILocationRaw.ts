import { ILocation } from './ILocation'

export type ILocationRaw = Omit<ILocation, 'id'> & { _id: string }

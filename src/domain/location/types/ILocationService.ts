import Location from '@domain/location/entities/Location'
import { ICreateLocation } from '@domain/location/types/ICreateLocation'

export interface ILocationService {
	findAll(): Promise<Location[]>
	findOne(id: string): Promise<Location | null>
	create(location: ICreateLocation): Promise<Location>
	update(id: string, location: ICreateLocation): Promise<Location | null>
	delete(id: string): Promise<boolean>
}

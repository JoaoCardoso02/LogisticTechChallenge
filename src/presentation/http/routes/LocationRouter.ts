import { Router } from 'express'

import BaseRouter from '@shared/http/controller/BaseRouter'
import BaseController from '@shared/http/controller/BaseController'

import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import { IRouter } from './IRouter'

@injectable()
export class LocationRouter extends BaseRouter implements IRouter {
	constructor(
		@inject(tokens.GetAllLocationsController)
		private getAllLocationsController: BaseController,

		@inject(tokens.GetOneLocationController)
		private getOneLocationController: BaseController,

		@inject(tokens.CreateLocationController)
		private createLocationController: BaseController,

		@inject(tokens.UpdateLocationController)
		private updateLocationController: BaseController,

		@inject(tokens.DeleteLocationController)
		private deleteLocationController: BaseController
	) {
		super(Router())
	}

	setup(): Router {
		this.get('/v1/locations', this.getAllLocationsController)
		this.get('/v1/locations/:id', this.getOneLocationController)
		this.post('/v1/locations', this.createLocationController)
		this.patch('/v1/locations/:id', this.updateLocationController)
		this.delete('/v1/locations/:id', this.deleteLocationController)

		return this.getRouter()
	}
}

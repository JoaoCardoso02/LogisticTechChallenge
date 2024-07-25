import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'
import { Router } from 'express'
import { IRouter } from '@presentation/http/routes/IRouter'
import DocsController from './controllers/DocsController'

@injectable()
export class Routes {
	constructor(
		@inject(tokens.OrderRouter)
		private orderRouter: IRouter,

		@inject(tokens.LocationRouter)
		private locationRouter: IRouter,

		@inject(tokens.ProductRouter)
		private productRouter: IRouter,

		@inject(tokens.DocsController)
		private docsController: DocsController
	) {}

	public setupRouter(router: Router) {
		router.use('/api/docs', this.docsController.initDocs)
		router.get('/api/docs', this.docsController.makeDocs)

		router.use('/api', this.orderRouter.setup())
		router.use('/api', this.locationRouter.setup())
		router.use('/api', this.productRouter.setup())
	}
}

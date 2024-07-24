import { container } from 'tsyringe'
import { tokens } from '@di/tokens'

const childContainer = container.createChildContainer()

// Global
import { Routes } from '@presentation/http/Routes'
import DocsService from '@infrastructure/docs/DocsService'
import DocsController from '@presentation/http/controllers/DocsController'
import { PostgreSQLClient } from '@infrastructure/postgresql/PostgreSQLClient'

childContainer.registerSingleton(tokens.Routes, Routes)
childContainer.registerSingleton(tokens.DocsService, DocsService)
childContainer.registerSingleton(tokens.DocsController, DocsController)
childContainer.registerSingleton(tokens.PostgreSQLClient, PostgreSQLClient)

// Order
import OrderRepository from '@domain/order/infrastructure/OrderRepository'
import OrderService from '@domain/order/services/OrderService'
import OrderAppService from '@application/order/OrderAppService'
import GetAllOrdersController from '@presentation/http/controllers/order/GetAllOrdersController'
import GetOneOrderController from '@presentation/http/controllers/order/GetOneOrderController'
import CreateOrderController from '@presentation/http/controllers/order/CreateOrderController'
import UpdateOrderController from '@presentation/http/controllers/order/UpdateOrderController'
import DeleteOrderController from '@presentation/http/controllers/order/DeleteOrderController'
import { OrderRouter } from '@presentation/http/routes/OrderRouter'

childContainer.registerSingleton(tokens.OrderRepository, OrderRepository)
childContainer.registerSingleton(tokens.OrderService, OrderService)
childContainer.registerSingleton(tokens.OrderAppService, OrderAppService)
childContainer.registerSingleton(
	tokens.GetAllOrdersController,
	GetAllOrdersController
)
childContainer.registerSingleton(
	tokens.GetOneOrderController,
	GetOneOrderController
)
childContainer.registerSingleton(
	tokens.CreateOrderController,
	CreateOrderController
)
childContainer.registerSingleton(
	tokens.UpdateOrderController,
	UpdateOrderController
)
childContainer.registerSingleton(
	tokens.DeleteOrderController,
	DeleteOrderController
)
childContainer.registerSingleton(tokens.OrderRouter, OrderRouter)

export { childContainer as container }

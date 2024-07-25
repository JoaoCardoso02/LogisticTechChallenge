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

// Location
import LocationRepository from '@domain/location/infrastructure/LocationRepository'
import LocationService from '@domain/location/services/LocationService'
import LocationAppService from '@application/location/LocationAppService'
import GetAllLocationsController from '@presentation/http/controllers/location/GetAllLocationsController'
import GetOneLocationController from '@presentation/http/controllers/location/GetOneLocationController'
import CreateLocationController from '@presentation/http/controllers/location/CreateLocationController'
import UpdateLocationController from '@presentation/http/controllers/location/UpdateLocationController'
import DeleteLocationController from '@presentation/http/controllers/location/DeleteLocationController'
import { LocationRouter } from '@presentation/http/routes/LocationRouter'

childContainer.registerSingleton(tokens.LocationRepository, LocationRepository)
childContainer.registerSingleton(tokens.LocationService, LocationService)
childContainer.registerSingleton(tokens.LocationAppService, LocationAppService)
childContainer.registerSingleton(
	tokens.GetAllLocationsController,
	GetAllLocationsController
)
childContainer.registerSingleton(
	tokens.GetOneLocationController,
	GetOneLocationController
)
childContainer.registerSingleton(
	tokens.CreateLocationController,
	CreateLocationController
)
childContainer.registerSingleton(
	tokens.UpdateLocationController,
	UpdateLocationController
)
childContainer.registerSingleton(
	tokens.DeleteLocationController,
	DeleteLocationController
)
childContainer.registerSingleton(tokens.LocationRouter, LocationRouter)


// Product
import ProductRepository from '@domain/product/infrastructure/ProductRepository'
import ProductService from '@domain/product/services/ProductService'
import ProductAppService from '@application/product/ProductAppService'
import GetAllProductsController from '@presentation/http/controllers/product/GetAllProductsController'
import GetOneProductController from '@presentation/http/controllers/product/GetOneProductController'
import CreateProductController from '@presentation/http/controllers/product/CreateProductController'
import UpdateProductController from '@presentation/http/controllers/product/UpdateProductController'
import DeleteProductController from '@presentation/http/controllers/product/DeleteProductController'
import { ProductRouter } from '@presentation/http/routes/ProductRouter'

childContainer.registerSingleton(tokens.ProductRepository, ProductRepository)
childContainer.registerSingleton(tokens.ProductService, ProductService)
childContainer.registerSingleton(tokens.ProductAppService, ProductAppService)
childContainer.registerSingleton(
	tokens.GetAllProductsController,
	GetAllProductsController
)
childContainer.registerSingleton(
	tokens.GetOneProductController,
	GetOneProductController
)
childContainer.registerSingleton(
	tokens.CreateProductController,
	CreateProductController
)
childContainer.registerSingleton(
	tokens.UpdateProductController,
	UpdateProductController
)
childContainer.registerSingleton(
	tokens.DeleteProductController,
	DeleteProductController
)
childContainer.registerSingleton(tokens.ProductRouter, ProductRouter)

export { childContainer as container }

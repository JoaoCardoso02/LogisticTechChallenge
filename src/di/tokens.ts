export const tokens = {
	// Global
	Routes: Symbol('Routes'),
	CronJob: Symbol('CronJob'),
	DocsService: Symbol('DocsService'),
	DocsController: Symbol('DocsController'),
	PostgreSQLClient: Symbol('PostgreSQLClient'),
	HttpClient: Symbol('HttpClient'),

	// Order
	OrderRepository: Symbol('OrderRepository'),
	ExternalOrderRepository: Symbol('ExternalOrderRepository'),
	OrderService: Symbol('OrderService'),
	OrderAppService: Symbol('OrderAppService'),
	OrderJobAppService: Symbol('OrderJobAppService'),
	GetAllOrdersController: Symbol('GetAllOrdersController'),
	GetOneOrderController: Symbol('GetOneOrderController'),
	CreateOrderController: Symbol('CreateOrderController'),
	UpdateOrderController: Symbol('UpdateOrderController'),
	DeleteOrderController: Symbol('DeleteOrderController'),
	RunOrderJobController: Symbol('RunOrderJobController'),
	OrderRouter: Symbol('OrderRouter'),

	// Location
	LocationRepository: Symbol('LocationRepository'),
	LocationService: Symbol('LocationService'),
	LocationAppService: Symbol('LocationAppService'),
	GetAllLocationsController: Symbol('GetAllLocationsController'),
	GetOneLocationController: Symbol('GetOneLocationController'),
	CreateLocationController: Symbol('CreateLocationController'),
	UpdateLocationController: Symbol('UpdateLocationController'),
	DeleteLocationController: Symbol('DeleteLocationController'),
	LocationRouter: Symbol('OrderRouter'),

	// Product
	ProductRepository: Symbol('ProductRepository'),
	ProductService: Symbol('ProductService'),
	ProductAppService: Symbol('ProductAppService'),
	GetAllProductsController: Symbol('GetAllProductsController'),
	GetOneProductController: Symbol('GetOneProductController'),
	CreateProductController: Symbol('CreateProductController'),
	UpdateProductController: Symbol('UpdateProductController'),
	DeleteProductController: Symbol('DeleteProductController'),
	ProductRouter: Symbol('ProductRouter'),
}

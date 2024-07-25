export const tokens = {
	// Global
	Routes: Symbol('Routes'),
	DocsService: Symbol('DocsService'),
	DocsController: Symbol('DocsController'),
	PostgreSQLClient: Symbol('PostgreSQLClient'),

	// Order
	OrderRepository: Symbol('OrderRepository'),
	OrderService: Symbol('OrderService'),
	OrderAppService: Symbol('OrderAppService'),
	GetAllOrdersController: Symbol('GetAllOrdersController'),
	GetOneOrderController: Symbol('GetOneOrderController'),
	CreateOrderController: Symbol('CreateOrderController'),
	UpdateOrderController: Symbol('UpdateOrderController'),
	DeleteOrderController: Symbol('DeleteOrderController'),
	OrderRouter: Symbol('OrderRouter'),

	// Location
	LocationRepository: Symbol('LocationRepository'),
	LocationService: Symbol('LocationService'),

	// Product
	ProductRepository: Symbol('ProductRepository'),
	ProductService: Symbol('ProductService'),
}

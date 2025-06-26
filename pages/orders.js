import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Orders() {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchOrders()
	}, [])

	function fetchOrders() {
		setLoading(true)
		// Simulamos datos de órdenes ya que no tenemos API real aún
		setTimeout(() => {
			setOrders([
				{
					_id: '1',
					customer: 'Juan Pérez',
					email: 'juan@example.com',
					products: [
						{ name: 'Producto 1', quantity: 2, price: 25.99 },
						{ name: 'Producto 2', quantity: 1, price: 15.50 }
					],
					total: 67.48,
					status: 'Pendiente',
					date: '2024-01-15',
					address: 'Calle Principal 123, Ciudad'
				},
				{
					_id: '2',
					customer: 'María García',
					email: 'maria@example.com',
					products: [
						{ name: 'Producto 3', quantity: 1, price: 89.99 }
					],
					total: 89.99,
					status: 'Enviado',
					date: '2024-01-14',
					address: 'Avenida Central 456, Ciudad'
				},
				{
					_id: '3',
					customer: 'Carlos López',
					email: 'carlos@example.com',
					products: [
						{ name: 'Producto 1', quantity: 3, price: 25.99 },
						{ name: 'Producto 4', quantity: 2, price: 12.75 }
					],
					total: 103.47,
					status: 'Entregado',
					date: '2024-01-13',
					address: 'Plaza Mayor 789, Ciudad'
				}
			])
			setLoading(false)
		}, 500)
	}

	function getStatusColor(status) {
		switch (status) {
			case 'Pendiente':
				return 'bg-yellow-100 text-yellow-800'
			case 'Enviado':
				return 'bg-blue-100 text-blue-800'
			case 'Entregado':
				return 'bg-green-100 text-green-800'
			case 'Cancelado':
				return 'bg-red-100 text-red-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	function formatDate(dateString) {
		const date = new Date(dateString)
		return date.toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	if (loading) {
		return (
			<Layout>
				<div className="flex justify-center items-center h-64">
					<div className="text-lg">Cargando órdenes...</div>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<h1>Gestión de Órdenes</h1>
			
			<div className="mb-4 flex justify-between items-center">
				<div className="text-sm text-gray-600">
					Total de órdenes: {orders.length}
				</div>
				<button 
					className="btn-primary"
					onClick={fetchOrders}
				>
					Actualizar
				</button>
			</div>

			{orders.length === 0 ? (
				<div className="bg-white p-8 rounded-lg shadow-md text-center">
					<div className="text-gray-500 text-lg mb-2">No hay órdenes disponibles</div>
					<div className="text-gray-400">Las órdenes aparecerán aquí cuando los clientes realicen compras</div>
				</div>
			) : (
				<div className="space-y-4">
					{orders.map((order) => (
						<div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
							<div className="flex justify-between items-start mb-4">
								<div>
									<h3 className="text-lg font-semibold text-gray-800">
										Orden #{order._id}
									</h3>
									<p className="text-gray-600">{formatDate(order.date)}</p>
								</div>
								<span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
									{order.status}
								</span>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
								<div>
									<h4 className="font-medium text-gray-700 mb-2">Cliente</h4>
									<p className="text-gray-600">{order.customer}</p>
									<p className="text-gray-500 text-sm">{order.email}</p>
								</div>
								<div>
									<h4 className="font-medium text-gray-700 mb-2">Dirección de envío</h4>
									<p className="text-gray-600">{order.address}</p>
								</div>
							</div>

							<div className="mb-4">
								<h4 className="font-medium text-gray-700 mb-2">Productos</h4>
								<div className="space-y-2">
									{order.products.map((product, index) => (
										<div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
											<div>
												<span className="text-gray-800">{product.name}</span>
												<span className="text-gray-500 ml-2">x{product.quantity}</span>
											</div>
											<span className="text-gray-700 font-medium">
												${(product.price * product.quantity).toFixed(2)}
											</span>
										</div>
									))}
								</div>
							</div>

							<div className="flex justify-between items-center pt-4 border-t border-gray-200">
								<div className="text-lg font-semibold text-gray-800">
									Total: ${order.total.toFixed(2)}
								</div>
								<div className="space-x-2">
									<button className="btn-default">
										Ver detalles
									</button>
									<button className="btn-primary">
										Cambiar estado
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</Layout>
	)
}

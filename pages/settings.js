import Layout from '@/components/Layout'
import { useState, useEffect } from 'react'

export default function Settings() {
	const [settings, setSettings] = useState({
		siteName: 'Mi Tienda Online',
		siteDescription: 'La mejor tienda online para todos tus productos',
		currency: 'USD',
		language: 'es',
		emailNotifications: true,
		orderNotifications: true,
		lowStockAlert: true,
		lowStockThreshold: 10,
		taxRate: 0,
		shippingCost: 0,
		freeShippingThreshold: 100
	})
	
	const [saved, setSaved] = useState(false)

	function handleInputChange(field, value) {
		setSettings(prev => ({
			...prev,
			[field]: value
		}))
		setSaved(false)
	}

	function handleSave(e) {
		e.preventDefault()
		// Aquí se guardarían las configuraciones en la base de datos
		console.log('Guardando configuraciones:', settings)
		setSaved(true)
		setTimeout(() => setSaved(false), 3000)
	}

	return (
		<Layout>
			<h1>Configuración del Sistema</h1>
			
			{saved && (
				<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
					Configuración guardada exitosamente
				</div>
			)}

			<form onSubmit={handleSave} className="space-y-6">
				{/* Configuración General */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">Configuración General</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Nombre del sitio
							</label>
							<input
								type="text"
								value={settings.siteName}
								onChange={(e) => handleInputChange('siteName', e.target.value)}
								className="w-full"
								placeholder="Nombre de tu tienda"
							/>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Moneda
							</label>
							<select
								value={settings.currency}
								onChange={(e) => handleInputChange('currency', e.target.value)}
								className="w-full"
							>
								<option value="USD">USD - Dólar Estadounidense</option>
								<option value="EUR">EUR - Euro</option>
								<option value="MXN">MXN - Peso Mexicano</option>
								<option value="COP">COP - Peso Colombiano</option>
								<option value="ARS">ARS - Peso Argentino</option>
							</select>
						</div>
					</div>

					<div className="mt-4">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Descripción del sitio
						</label>
						<textarea
							value={settings.siteDescription}
							onChange={(e) => handleInputChange('siteDescription', e.target.value)}
							rows={3}
							className="w-full"
							placeholder="Descripción de tu tienda"
						/>
					</div>
				</div>

				{/* Configuración de Notificaciones */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">Notificaciones</h2>
					
					<div className="space-y-4">
						<div className="flex items-center">
							<input
								type="checkbox"
								id="emailNotifications"
								checked={settings.emailNotifications}
								onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
								className="mr-3"
							/>
							<label htmlFor="emailNotifications" className="text-gray-700">
								Recibir notificaciones por email
							</label>
						</div>
						
						<div className="flex items-center">
							<input
								type="checkbox"
								id="orderNotifications"
								checked={settings.orderNotifications}
								onChange={(e) => handleInputChange('orderNotifications', e.target.checked)}
								className="mr-3"
							/>
							<label htmlFor="orderNotifications" className="text-gray-700">
								Notificar nuevas órdenes
							</label>
						</div>
						
						<div className="flex items-center">
							<input
								type="checkbox"
								id="lowStockAlert"
								checked={settings.lowStockAlert}
								onChange={(e) => handleInputChange('lowStockAlert', e.target.checked)}
								className="mr-3"
							/>
							<label htmlFor="lowStockAlert" className="text-gray-700">
								Alertas de stock bajo
							</label>
						</div>
						
						{settings.lowStockAlert && (
							<div className="ml-6">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Umbral de stock bajo
								</label>
								<input
									type="number"
									value={settings.lowStockThreshold}
									onChange={(e) => handleInputChange('lowStockThreshold', parseInt(e.target.value))}
									min="1"
									className="w-32"
									placeholder="10"
								/>
								<span className="ml-2 text-gray-500 text-sm">unidades</span>
							</div>
						)}
					</div>
				</div>

				{/* Configuración de Ventas */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">Configuración de Ventas</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Tasa de impuesto (%)
							</label>
							<input
								type="number"
								value={settings.taxRate}
								onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
								min="0"
								max="100"
								step="0.1"
								className="w-full"
								placeholder="0"
							/>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Costo de envío ($)
							</label>
							<input
								type="number"
								value={settings.shippingCost}
								onChange={(e) => handleInputChange('shippingCost', parseFloat(e.target.value) || 0)}
								min="0"
								step="0.01"
								className="w-full"
								placeholder="0"
							/>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Envío gratis desde ($)
							</label>
							<input
								type="number"
								value={settings.freeShippingThreshold}
								onChange={(e) => handleInputChange('freeShippingThreshold', parseFloat(e.target.value) || 0)}
								min="0"
								step="0.01"
								className="w-full"
								placeholder="100"
							/>
						</div>
					</div>
				</div>

				{/* Información del Sistema */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">Información del Sistema</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
						<div>
							<span className="font-medium text-gray-700">Versión:</span>
							<span className="ml-2 text-gray-600">1.0.0</span>
						</div>
						<div>
							<span className="font-medium text-gray-700">Base de datos:</span>
							<span className="ml-2 text-gray-600">MongoDB</span>
						</div>
						<div>
							<span className="font-medium text-gray-700">Última actualización:</span>
							<span className="ml-2 text-gray-600">{new Date().toLocaleDateString('es-ES')}</span>
						</div>
						<div>
							<span className="font-medium text-gray-700">Estado:</span>
							<span className="ml-2 text-green-600">Activo</span>
						</div>
					</div>
				</div>

				{/* Botones de acción */}
				<div className="flex justify-end space-x-4">
					<button
						type="button"
						className="btn-default"
						onClick={() => window.location.reload()}
					>
						Cancelar
					</button>
					<button
						type="submit"
						className="btn-primary"
					>
						Guardar Configuración
					</button>
				</div>
			</form>
		</Layout>
	)
}

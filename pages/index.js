import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Home() {
	return (
		<Layout>
			<div>
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">Panel de Administración</h1>
					<p className="text-gray-600">Bienvenido al sistema de gestión de tu tienda online</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Link href="/products" className="group">
						<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 group-hover:border-blue-200">
							<div className="flex items-center">
								<div className="p-3 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors duration-200">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
									</svg>
								</div>
								<div className="ml-4">
									<h2 className="text-lg font-semibold text-gray-700 group-hover:text-blue-700 transition-colors duration-200">Productos</h2>
									<p className="text-gray-500 text-sm">Gestionar inventario</p>
								</div>
							</div>
						</div>
					</Link>

					<Link href="/categories" className="group">
						<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 group-hover:border-green-200">
							<div className="flex items-center">
								<div className="p-3 rounded-full bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors duration-200">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
									</svg>
								</div>
								<div className="ml-4">
									<h2 className="text-lg font-semibold text-gray-700 group-hover:text-green-700 transition-colors duration-200">Categorías</h2>
									<p className="text-gray-500 text-sm">Organizar productos</p>
								</div>
							</div>
						</div>
					</Link>

					<Link href="/orders" className="group">
						<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 group-hover:border-yellow-200">
							<div className="flex items-center">
								<div className="p-3 rounded-full bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 transition-colors duration-200">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
									</svg>
								</div>
								<div className="ml-4">
									<h2 className="text-lg font-semibold text-gray-700 group-hover:text-yellow-700 transition-colors duration-200">Órdenes</h2>
									<p className="text-gray-500 text-sm">Gestionar pedidos</p>
								</div>
							</div>
						</div>
					</Link>

					<Link href="/settings" className="group">
						<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 group-hover:border-purple-200">
							<div className="flex items-center">
								<div className="p-3 rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-200 transition-colors duration-200">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
								</div>
								<div className="ml-4">
									<h2 className="text-lg font-semibold text-gray-700 group-hover:text-purple-700 transition-colors duration-200">Configuración</h2>
									<p className="text-gray-500 text-sm">Ajustes del sistema</p>
								</div>
							</div>
						</div>
					</Link>
				</div>

				{/* Estadísticas rápidas */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-blue-100 text-sm">Total Productos</p>
								<p className="text-2xl font-bold">24</p>
							</div>
							<div className="bg-blue-400 p-3 rounded-full">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
								</svg>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-green-100 text-sm">Órdenes Hoy</p>
								<p className="text-2xl font-bold">8</p>
							</div>
							<div className="bg-green-400 p-3 rounded-full">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
								</svg>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-purple-100 text-sm">Ventas Hoy</p>
								<p className="text-2xl font-bold">$1,247</p>
							</div>
							<div className="bg-purple-400 p-3 rounded-full">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

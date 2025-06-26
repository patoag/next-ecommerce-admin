import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from './Logo'

export default function Nav({ show }) {
	const inactiveLink = 'flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200'
	const activeLink = 'flex items-center gap-3 p-3 rounded-lg bg-blue-100 text-blue-800 font-medium'
	const inactiveIcon = 'w-5 h-5'
	const activeIcon = 'w-5 h-5 text-blue-600'
	const router = useRouter()
	const { pathname } = router

	return (
		<aside
			className={
				(show ? 'left-0' : '-left-full') +
				' top-0 text-gray-500 p-6 fixed bg-white w-full h-full md:static md:w-auto transition-all shadow-lg md:shadow-none border-r border-gray-200'
			}
		>
			<div className="mb-8 mr-4">
				<Logo />
			</div>

			<nav className="flex flex-col gap-1">
				<Link
					href={'/'}
					className={pathname === '/' ? activeLink : inactiveLink}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className={pathname === '/' ? activeIcon : inactiveIcon}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>
					Inicio
				</Link>

				<Link
					href={'/products'}
					className={
						pathname.includes('/products')
							? activeLink
							: inactiveLink
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className={
							pathname === '/products' ? activeIcon : inactiveIcon
						}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
						/>
					</svg>
					Productos
				</Link>

				<Link
					href={'/categories'}
					className={
						pathname.includes('/categories')
							? activeLink
							: inactiveLink
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className={
							pathname === '/categories'
								? activeIcon
								: inactiveIcon
						}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
						/>
					</svg>
					Categorías
				</Link>

				<Link
					href={'/orders'}
					className={
						pathname.includes('/orders') ? activeLink : inactiveLink
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className={
							pathname === '/orders' ? activeIcon : inactiveIcon
						}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
						/>
					</svg>
					Órdenes
				</Link>
				<Link
					href={'/settings'}
					className={
						pathname.includes('/settings')
							? activeLink
							: inactiveLink
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className={
							pathname === '/settings' ? activeIcon : inactiveIcon
						}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					Configuración
				</Link>


			</nav>
		</aside>
	)
}

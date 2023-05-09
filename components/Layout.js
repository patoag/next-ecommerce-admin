import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import Nav from '@/components/Nav'

export default function Layout({ children }) {
	const [showNav, setShowNav] = useState(false)
	const { data: session } = useSession()

	if (!session) {
		return (
			<div className="bg-bgGray w-screen h-screen flex items-center">
				<div className="text-center w-full">
					<button
						className="bg-white p-2 px-4 rounded-lg"
						onClick={() => signIn('google')}
					>
						Iniciar sesión con google
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="bg-bgGray min-h-screen">
			<button onClick={() => setShowNav(true)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
			<div className="flex">
				<Nav show={showNav} />
				<div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
					{children}
				</div>
			</div>
		</div>
	)
}

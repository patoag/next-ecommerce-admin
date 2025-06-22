import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  // Modo sin autenticación: creamos una sesión ficticia si no existe
  const devSession = session || {
    user: { name: 'Admin', email: 'admin@example.com' }
  };
  
  return (
    <SessionProvider session={devSession}>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}

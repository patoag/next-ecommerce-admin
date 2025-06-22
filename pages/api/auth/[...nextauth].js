import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Configuración simplificada para desarrollo en entorno Docker

export const authOptions = {
    providers: [
        // Usar un proveedor simple de credenciales para desarrollo
        CredentialsProvider({
            name: 'development',
            credentials: {},
            authorize: async () => {
                // Modo de desarrollo: auto-autoriza cualquier solicitud
                return { id: '1', name: 'Admin', email: 'admin@example.com' }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || 'pato_secret_key',
    session: {
        strategy: 'jwt',
    },
    // No usar adapter para evitar errores con MongoDB
    callbacks: {
        session: ({session}) => {
            return session
        }
    }
}

export default NextAuth(authOptions)

// Función simplificada que permite todas las solicitudes
export async function isAdminRequest(req, res){
    // En modo desarrollo, todas las solicitudes son permitidas
    return true
}
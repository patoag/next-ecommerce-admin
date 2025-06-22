import { NextResponse } from 'next/server';

export function middleware(request) {
  // Obtener la URL de origen permitida desde las variables de entorno
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:4000';
  
  // Verificar si es una solicitud de preflight OPTIONS
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 });
    
    // Configurar los headers CORS
    response.headers.set('Access-Control-Allow-Origin', corsOrigin);
    response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Max-Age', '86400');
    
    return response;
  }
  
  // Continuar con la siguiente middleware o ruta
  return NextResponse.next();
}

// Configurar qué rutas deben usar este middleware
export const config = {
  matcher: '/api/:path*',
};

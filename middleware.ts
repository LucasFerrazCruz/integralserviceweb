import { NextRequest, NextResponse } from 'next/server'

const ROTAS_PUBLICAS = ['/login']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const rotaPublica = ROTAS_PUBLICAS.some((rota) => pathname.startsWith(rota))

  // usuário não logado tentando acessar rota protegida
  if (!token && !rotaPublica) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // usuário logado tentando acessar login
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/produtos/:path*', '/estoque/:path*', '/clientes/:path*', '/usuarios/:path*'],
}

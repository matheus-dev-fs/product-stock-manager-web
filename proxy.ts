import { NextRequest, NextResponse } from 'next/server'

function decodeJwtPayload(token: string): { exp?: number } | null {
    try {
        const payload = token.split('.')[1]

        if (!payload) {
            return null
        }

        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
        const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
        const json = atob(paddedBase64)

        return JSON.parse(json)
    } catch {
        return null
    }
}

function isTokenExpired(token: string | undefined): boolean {
    if (!token) {
        return true
    }

    const payload = decodeJwtPayload(token)
    if (!payload?.exp) {
        return true
    }

    return payload.exp * 1000 <= Date.now();
}

async function refreshSession(refreshToken: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
        return null
    }

    const payload = await response.json()
    return payload?.data ?? null
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname === '/favicon.ico' ||
        pathname === '/login' ||
        pathname.startsWith('/public')
    ) {
        return NextResponse.next()
    }

    const accessToken = request.cookies.get('access_token')?.value
    const refreshToken = request.cookies.get('refresh_token')?.value

    if (!refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (!isTokenExpired(accessToken)) {
        return NextResponse.next()
    }

    const refreshed = await refreshSession(refreshToken)

    if (!refreshed?.accessToken) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('access_token')
        response.cookies.delete('refresh_token')
        return response
    }

    const response = NextResponse.next()
    response.cookies.set('access_token', refreshed.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60,
    })

    if (refreshed.refreshToken) {
        response.cookies.set('refresh_token', refreshed.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
        })
    }

    return response
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|login|api).*)'],
}
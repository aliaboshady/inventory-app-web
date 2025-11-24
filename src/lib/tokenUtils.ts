import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { COOKIES_KEYS } from './staticKeys';

interface JwtPayload {
  sub: string;
  exp: number;
}

export const getAccessToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIES_KEYS.accessToken)?.value;
  return token || null;
};

export const saveTokens = async (accessToken: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(COOKIES_KEYS.accessToken, accessToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
};

export const clearTokens = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIES_KEYS.accessToken);
};

export const getUserIdFromToken = (token: string): string | null => {
  try {
    const { sub } = jwtDecode<JwtPayload>(token);
    return sub;
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    // Add a small buffer (e.g., 10 seconds) to account for network delays
    return exp * 1000 < Date.now() + 10000;
  } catch (error) {
    return true;
  }
};

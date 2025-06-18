const BASE_API_ROOT = 'http://localhost:3005/api'
import type { AuthenticatedUser } from "../vite-env.d.ts"


// Helper to handle responses
const processResponse = async (response: Response): Promise<AuthenticatedUser> => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
    // data.error = data.message || 'Request failed';
  }
  console.log('registered', data)
  return data;
}

export const login = async ({ email, password }: { email: string; password: string }): Promise<AuthenticatedUser> => {
    const response = await fetch(`${BASE_API_ROOT}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return processResponse(response);
};

export const logout = async () => {
    const response = await fetch(`${BASE_API_ROOT}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Include cookies
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return processResponse(response);
};

export const register = async ({name, email, password }: { name: string; email: string; password: string }): Promise<AuthenticatedUser> => {
    const response = await fetch(`${BASE_API_ROOT}/auth/register`, {
        
        method: 'POST',
        body: JSON.stringify({name, email, password }),
        credentials: 'include', // Include cookies
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return processResponse(response);
};

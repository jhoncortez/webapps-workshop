import type {RequestedProfile, ProfileDataBody} from '../vite-env.d.ts'
const BASE_API_ROOT = 'http://localhost:3005/api'

const processResponse = async (response: Response): Promise<RequestedProfile> => {
  const data = await response.json();

  console.log(data)
  
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
    // data.error = data.message || 'Request failed';
  }
  console.log(data)
  return data;
}
export const getProfile = async (): Promise<RequestedProfile> => {
    const response = await fetch(`${BASE_API_ROOT}/profile/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return processResponse(response);
};

export const updateProfile = async (profileDataBody: ProfileDataBody): Promise<RequestedProfile> => {
    const response = await fetch(`${BASE_API_ROOT}/profile/update-profile`, {
        method: 'PATCH',
        body: JSON.stringify(profileDataBody),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return processResponse(response);
};
import axios from 'axios';

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

const getAccessToken = async (): Promise<string> => {
  try {
    let token = localStorage.getItem('accessToken') || '';

    if (!token || isTokenExpired(token)) {
      const response = await axios.post('/api/token');
      token = response.data.accessToken || '';
      localStorage.setItem('accessToken', token);
    }

    return token;
  } catch {
    throw new Error('Failed to obtain access token');
  }
};

export default getAccessToken;

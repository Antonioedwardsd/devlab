import axios from 'axios';

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://dev-ic5orsxdvq2t72hh.us.auth0.com/oauth/token',
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_API_AUDIENCE,
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to obtain access token');
  }
};

export default getAccessToken;

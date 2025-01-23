import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || 'Ag9aOPYe7gF4bI5QoHkobG6R9VldfuZv',
  clientSecret:
    process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET || 'co820BQXB5Tj8OR_ucYMNh21aQ4JqwlhU1c6ScHeFhRJoM39LcnybKggd_F4kNNi',
  issuerBaseURL: process.env.NEXT_PUBLIC_AUTH0_ISSUER || 'https://dev-3iiyrnf7x5ya3qwp.us.auth0.com/',
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  authorizationParams: {
    audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE || 'https://taskapi.com/api/tasks',
    scope: 'openid profile email read:todos create:todos update:todos delete:todos',
  },
});

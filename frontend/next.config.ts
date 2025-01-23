// next.config.js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    AUTH0_SECRET: 'co820BQXB5Tj8OR_ucYMNh21aQ4JqwlhU1c6ScHeFhRJoM39LcnybKggd_F4kNNi',
    AUTH0_BASE_URL: 'http://localhost:3000',
    AUTH0_ISSUER_BASE_URL: 'https://dev-3iiyrnf7x5ya3qwp.us.auth0.com',
    AUTH0_CLIENT_ID: 'Ag9aOPYe7gF4bI5QoHkobG6R9VldfuZv',
    AUTH0_CLIENT_SECRET: 'co820BQXB5Tj8OR_ucYMNh21aQ4JqwlhU1c6ScHeFhRJoM39LcnybKggd_F4kNNi',
  },
};

export default nextConfig;

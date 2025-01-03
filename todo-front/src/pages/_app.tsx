import { AppProps } from 'next/app';
import { Auth0Provider } from '@auth0/auth0-react';
import '../styles/globals.css';
import { authConfig } from '../auth/authConfig';

export default function MyApp({ Component, pageProps }: AppProps) {
  console.log('App component mounted');
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: authConfig.redirectUri,
      }}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

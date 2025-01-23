import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      if (localStorage.getItem('sessionValidated')) {
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          localStorage.setItem('sessionValidated', 'true');
        } else {
          console.error('Failed to fetch session. Redirecting to login.');
          router.push('/api/auth/login');
        }
      } catch (error) {
        console.error('Error validating session:', error);
        router.push('/api/auth/login');
      }
    };

    validateSession();
  }, [router]);

  return (
    <UserProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}

import '@/styles/globals.css';
import { AuthProvider } from '@/utilities/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

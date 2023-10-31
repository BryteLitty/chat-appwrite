import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/utilities/AuthContext';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) { // Check if the user is undefined or not authenticated
      // Redirect the user to the login page on the client side
      router.push('/login');
    }
  }, [user, router]);

  // Return the children if the user is authenticated
  return user ? children : null;
};

export default PrivateRoute;

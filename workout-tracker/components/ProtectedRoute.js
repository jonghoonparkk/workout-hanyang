// components/ProtectedRoute.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

const ProtectedRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

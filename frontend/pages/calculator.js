
import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const CalculatorComponent = () => {
  const router = useRouter();
  const authHeader = useAuthHeader();
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();

  useEffect(() => {
    console.log(authUser, authHeader, isAuthenticated)
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  return (
    <div>
      Calculator here
    </div>
  );
};

export default CalculatorComponent;

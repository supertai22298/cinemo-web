import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectAuthenticated } from 'src/redux/slices/authSlice';

import { useRouter } from './hooks';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectAuthenticated);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
};

export default PrivateRoute;

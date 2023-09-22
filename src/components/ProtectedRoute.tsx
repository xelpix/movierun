import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserAuth();
  const lastPage = localStorage.getItem('lastPage');

  if (lastPage) {
    return children;
  } else if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

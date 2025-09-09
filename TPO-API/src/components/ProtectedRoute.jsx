import {navigate} from 'react-router-dom';
import { useUser } from '../features/auth/context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated ) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

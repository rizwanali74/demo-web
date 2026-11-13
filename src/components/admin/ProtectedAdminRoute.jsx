import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../hooks/useStore';

export default function ProtectedAdminRoute({ children }) {
  const location = useLocation();
  const { superAdmin } = useStore();

  if (!superAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

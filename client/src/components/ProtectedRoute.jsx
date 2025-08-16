import { Navigate } from 'react-router-dom';
import { useAuth } from '../store_auth';

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  if (user.role === 'pending') return <Navigate to="/pending" replace />;
  return children;
}

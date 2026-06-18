import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { Role } from '../types';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <main className="page"><p>Loading...</p></main>;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to={`/${user.role}`} replace />;
  return <>{children}</>;
}

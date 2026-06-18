import { Link, Outlet } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NotificationBell } from './NotificationBell';

export function Layout() {
  const { user, logout } = useAuth();
  return (
    <>
      <header className="topbar">
        <Link to={user ? `/${user.role}` : '/login'} className="brand">Attendance</Link>
        <div className="topbar__right">
          {user?.role === 'teacher' && <NotificationBell />}
          <span>{user?.username} ({user?.role})</span>
          <button onClick={logout} className="icon-button" title="Logout"><LogOut size={18} /></button>
        </div>
      </header>
      <Outlet />
    </>
  );
}

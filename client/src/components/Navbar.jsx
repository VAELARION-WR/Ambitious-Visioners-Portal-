import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../store_auth';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">Ambitious Visioners Portal</Link>
        <div className="flex items-center gap-4">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-blue-700' : 'text-gray-700'}>Home</NavLink>
          {user && <NavLink to="/dashboard" className={({isActive}) => isActive ? 'text-blue-700' : 'text-gray-700'}>Dashboard</NavLink>}
          {user?.role === 'admin' && <NavLink to="/admin" className={({isActive}) => isActive ? 'text-blue-700' : 'text-gray-700'}>Admin</NavLink>}
          {!user ? (<>
              <NavLink to="/login" className="text-gray-700">Login</NavLink>
              <NavLink to="/signup" className="text-gray-700">Sign up</NavLink>
            </>
          ) : (
            <button onClick={logout} className="px-3 py-1 rounded-xl bg-gray-900 text-white">Logout</button>
          )}
        </div>
      </div>
    </nav>
  )
}

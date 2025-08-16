import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../store_auth';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      saveAuth(data);
      navigate('/dashboard');
    } catch (e) {
      setError(e?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="rounded-2xl border p-6 bg-white shadow-sm">
        <h2 className="text-2xl font-bold">Login</h2>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input className="w-full border rounded-xl p-3" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full border rounded-xl p-3" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button disabled={loading} className="w-full rounded-xl bg-gray-900 text-white py-3">{loading?'Working...':'Login'}</button>
        </form>
        <p className="mt-3 text-sm text-gray-600">No account? <Link to="/signup" className="text-blue-700">Sign up</Link></p>
      </motion.div>
    </div>
  );
}

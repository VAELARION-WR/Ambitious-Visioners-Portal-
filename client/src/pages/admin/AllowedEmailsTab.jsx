import { useEffect, useState } from 'react';
import api from '../../api';

export default function AllowedEmailsTab() {
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState('');

  const load = async () => {
    const { data } = await api.get('/api/allowed-emails');
    setItems(data);
  };
  useEffect(() => { load(); }, []);

  const addEmail = async (e) => {
    e.preventDefault();
    if (!email) return;
    await api.post('/api/allowed-emails', { email });
    setEmail('');
    load();
  };

  const removeEmail = async (id) => {
    await api.delete('/api/allowed-emails/' + id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-6 bg-white shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Add Allowed Email</h2>
        <form className="flex gap-3" onSubmit={addEmail}>
          <input className="border rounded-xl p-3 flex-1" placeholder="student@college.edu" value={email} onChange={e=>setEmail(e.target.value)} />
          <button className="rounded-xl bg-gray-900 text-white px-4">Add</button>
        </form>
      </div>
      <div className="rounded-2xl border p-6 bg-white shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Current Allowlist</h2>
        {items.length === 0 ? <div className="text-gray-600">No emails allowed yet.</div> : (
          <ul className="divide-y">
            {items.map(it => (
              <li key={it._id} className="py-3 flex items-center justify-between">
                <span>{it.email}</span>
                <button onClick={()=>removeEmail(it._id)} className="px-3 py-1 rounded-xl bg-red-600 text-white">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import api from '../../api';

export default function UsersTab() {
  const [pending, setPending] = useState([]);
  const load = async () => {
    const { data } = await api.get('/api/admin/pending-users');
    setPending(data);
  };
  useEffect(() => { load(); }, []);

  const approve = async (id, role) => {
    await api.put('/api/admin/approve/' + id, { role });
    load();
  };

  return (
    <div className="rounded-2xl border p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Pending Users</h2>
      {pending.length === 0 ? <div className="text-gray-600">No pending users.</div> : (
        <div className="overflow-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map(u => (
                <tr key={u.id} className="border-b">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2 flex gap-2">
                    <button onClick={()=>approve(u.id,'student')} className="px-3 py-1 rounded-xl bg-gray-900 text-white">Approve as Student</button>
                    <button onClick={()=>approve(u.id,'admin')} className="px-3 py-1 rounded-xl border">Make Admin</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

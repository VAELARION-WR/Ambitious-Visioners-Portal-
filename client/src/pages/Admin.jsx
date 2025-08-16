import { useState } from 'react';
import EntriesTab from './admin/EntriesTab';
import UsersTab from './admin/UsersTab';
import AllowedEmailsTab from './admin/AllowedEmailsTab';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Admin() {
  const [tab, setTab] = useState('entries');
  return (
    <ProtectedRoute role="admin">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-3 mb-6">
          <button onClick={()=>setTab('entries')} className={`px-4 py-2 rounded-xl border ${tab==='entries'?'bg-gray-900 text-white':'bg-white'}`}>Entries</button>
          <button onClick={()=>setTab('users')} className={`px-4 py-2 rounded-xl border ${tab==='users'?'bg-gray-900 text-white':'bg-white'}`}>Users</button>
          <button onClick={()=>setTab('allow')} className={`px-4 py-2 rounded-xl border ${tab==='allow'?'bg-gray-900 text-white':'bg-white'}`}>Allowed Emails</button>
        </div>
        {tab==='entries' && <EntriesTab />}
        {tab==='users' && <UsersTab />}
        {tab==='allow' && <AllowedEmailsTab />}
      </div>
    </ProtectedRoute>
  );
}

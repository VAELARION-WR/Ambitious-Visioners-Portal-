import { useEffect, useState } from 'react';
import api from '../../api';
import Card from '../../components/Card';
import { motion } from 'framer-motion';

export default function EntriesTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ type: 'note', title: '', content: '', dueDate: '' });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await api.get('/api/entries');
    setItems(data);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const body = { ...form, dueDate: form.dueDate || undefined };
    await api.post('/api/entries', body);
    setForm({ type: 'note', title: '', content: '', dueDate: '' });
    load();
  };

  const del = async (id) => { await api.delete('/api/entries/' + id); load(); };

  return (
    <div className="space-y-8">
      <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="rounded-2xl border p-6 bg-white shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Create Entry</h2>
        <form className="grid md:grid-cols-4 gap-3 items-start" onSubmit={submit}>
          <select className="border rounded-xl p-3" value={form.type} onChange={e=>setForm(v=>({...v,type:e.target.value}))}>
            <option value="note">Note</option>
            <option value="assignment">Assignment</option>
            <option value="diary">Daily Diary</option>
          </select>
          <input className="border rounded-xl p-3" placeholder="Title" value={form.title} onChange={e=>setForm(v=>({...v,title:e.target.value}))} />
          <input className="border rounded-xl p-3" placeholder="Due date (optional)" type="date" value={form.dueDate} onChange={e=>setForm(v=>({...v,dueDate:e.target.value}))} />
          <button className="rounded-xl bg-gray-900 text-white py-3 px-4">Save</button>
          <textarea className="md:col-span-4 border rounded-xl p-3" rows="5" placeholder="Content…" value={form.content} onChange={e=>setForm(v=>({...v,content:e.target.value}))} />
        </form>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-4">
        {loading ? <div>Loading…</div> : items.map((it) => (
          <motion.div key={it._id} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}}>
            <Card title={`${it.title} (${it.type})`} footer={it.dueDate ? `Due: ${new Date(it.dueDate).toLocaleDateString()}` : null}>
              <div className="whitespace-pre-wrap">{it.content}</div>
              <div className="mt-3"><button onClick={()=>del(it._id)} className="px-3 py-1 rounded-xl bg-red-600 text-white">Delete</button></div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

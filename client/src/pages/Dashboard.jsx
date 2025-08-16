import { useEffect, useState } from 'react';
import api from '../api';
import Card from '../components/Card';
import { motion } from 'framer-motion';

function Section({ title, type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/entries', { params: { type } });
        setItems(data);
      } finally { setLoading(false); }
    })();
  }, [type]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      {loading ? <div className="text-gray-600">Loading…</div> : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((it) => (
            <motion.div key={it._id} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}}>
              <Card title={it.title} footer={it.dueDate ? `Due: ${new Date(it.dueDate).toLocaleDateString()}` : null}>
                <div className="whitespace-pre-wrap">{it.content}</div>
              </Card>
            </motion.div>
          ))}
          {items.length === 0 && <div className="text-gray-600">No items yet.</div>}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <Section title="Notes" type="note" />
      <Section title="Assignments" type="assignment" />
      <Section title="Daily Diary" type="diary" />
    </div>
  );
}

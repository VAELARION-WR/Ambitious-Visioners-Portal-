import { motion } from 'framer-motion';
export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ambitious Visioners Portal</h1>
        <p className="mt-4 text-gray-600 text-lg">Notes, Assignments, and Daily Diary for your class — all in one place.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[{title:'Notes',desc:'Latest lecture notes and references'},{title:'Assignments',desc:'Assigned work and due dates'},{title:'Daily Diary',desc:'Day-by-day recap and tasks'}].map((c,i)=>(
            <motion.div key={i} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.1}} className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="text-gray-600 mt-2">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function Pending() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="rounded-2xl border p-8 bg-white shadow-sm">
        <h2 className="text-2xl font-bold">Awaiting Approval</h2>
        <p className="mt-3 text-gray-600">Your account is pending admin approval. You’ll get access as soon as you’re approved.</p>
        <p className="mt-3 text-sm text-gray-500">Tip: If this takes a while, contact your class admin.</p>
        <Link to="/" className="inline-block mt-6 px-4 py-2 rounded-xl bg-gray-900 text-white">Go Home</Link>
      </motion.div>
    </div>
  );
}

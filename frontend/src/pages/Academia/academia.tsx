import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

export default function Academia() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-900 via-red-900 to-red-800">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="mb-6"
      >
        <Settings size={48} className="text-red-200" />
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-3xl font-bold text-red-100 text-center"
      >
        Disponível Brevemente
      </motion.h2>
    </div>
  );
}
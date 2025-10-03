import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface SupporterNoteProps {
  name: string;
  amount: number;
  message: string;
  timestamp: Date;
  index: number;
}

export function SupporterNote({ name, amount, message, timestamp, index }: SupporterNoteProps) {
  return (
    <motion.div
      className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white text-sm">{name}</p>
            <p className="text-zinc-400 text-xs">
              {timestamp.toLocaleDateString()} • ${amount}
            </p>
          </div>
        </div>
      </div>
      
      {message && (
        <p className="text-zinc-300 text-sm italic pl-10">
          "{message}"
        </p>
      )}
    </motion.div>
  );
}
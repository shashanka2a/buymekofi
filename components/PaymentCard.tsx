"use client";
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface PaymentCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick: () => void;
  gradient?: boolean;
  layout?: 'vertical' | 'horizontal';
}

export function PaymentCard({ icon: Icon, label, description, onClick, gradient = false, layout = 'vertical' }: PaymentCardProps) {
  if (layout === 'horizontal') {
    return (
      <motion.div
        className={`
          relative p-6 rounded-2xl border border-zinc-800 cursor-pointer
          ${gradient 
            ? 'bg-gradient-to-br from-purple-500/10 to-pink-600/10 hover:from-purple-500/20 hover:to-pink-600/20' 
            : 'bg-zinc-900/50 hover:bg-zinc-800/50'
          }
          transition-all duration-300
        `}
        whileHover={{ 
          scale: 1.02,
          boxShadow: gradient 
            ? '0 10px 30px rgba(168, 85, 247, 0.2)' 
            : '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        <div className="flex items-center space-x-4">
          <div className={`
            p-3 rounded-xl flex-shrink-0
            ${gradient 
              ? 'bg-gradient-to-br from-purple-500 to-pink-600' 
              : 'bg-zinc-800'
            }
          `}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white mb-1">{label}</h3>
            <p className="text-zinc-400 text-sm">{description}</p>
          </div>
          <div className="text-zinc-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        </div>
        
        {gradient && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-600/5 pointer-events-none" />
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`
        relative p-6 rounded-2xl border border-zinc-800 cursor-pointer
        ${gradient 
          ? 'bg-gradient-to-br from-purple-500/10 to-pink-600/10 hover:from-purple-500/20 hover:to-pink-600/20' 
          : 'bg-zinc-900/50 hover:bg-zinc-800/50'
        }
        transition-all duration-300
      `}
      whileHover={{ 
        y: -4,
        boxShadow: gradient 
          ? '0 20px 40px rgba(168, 85, 247, 0.3)' 
          : '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={`
          p-3 rounded-xl
          ${gradient 
            ? 'bg-gradient-to-br from-purple-500 to-pink-600' 
            : 'bg-zinc-800'
          }
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white mb-1">{label}</h3>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>
      </div>
      
      {gradient && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-600/5 pointer-events-none" />
      )}
    </motion.div>
  );
}
"use client";
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface CoffeeCupProps {
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function CoffeeCup({ animate = false, size = 'md' }: CoffeeCupProps) {
  const [fillAnimation, setFillAnimation] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setFillAnimation(true), 500);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        initial={{ scale: 0 }}
        animate={{ scale: animate ? 1 : 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {/* Coffee cup outline */}
        <path
          d="M20 30 L20 80 Q20 85 25 85 L65 85 Q70 85 70 80 L70 30 Z"
          fill="none"
          stroke="#71717a"
          strokeWidth="2"
        />
        
        {/* Cup handle */}
        <path
          d="M70 40 Q80 40 80 50 Q80 60 70 60"
          fill="none"
          stroke="#71717a"
          strokeWidth="2"
        />
        
        {/* Coffee fill with gradient */}
        <defs>
          <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        
        <motion.rect
          x="22"
          y="32"
          width="46"
          height="0"
          fill="url(#coffeeGradient)"
          animate={{
            height: fillAnimation ? 48 : 0,
            y: fillAnimation ? 32 + (48 - 48) : 32 + 48
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut",
            delay: animate ? 0.3 : 0
          }}
        />
        
        {/* Steam */}
        {animate && (
          <>
            <motion.path
              d="M35 25 Q37 20 35 15 Q33 10 35 5"
              fill="none"
              stroke="#71717a"
              strokeWidth="1.5"
              opacity="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 1 }}
            />
            <motion.path
              d="M45 25 Q47 20 45 15 Q43 10 45 5"
              fill="none"
              stroke="#71717a"
              strokeWidth="1.5"
              opacity="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 2, delay: 1.2 }}
            />
            <motion.path
              d="M55 25 Q57 20 55 15 Q53 10 55 5"
              fill="none"
              stroke="#71717a"
              strokeWidth="1.5"
              opacity="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 1.4 }}
            />
          </>
        )}
      </motion.svg>
    </div>
  );
}
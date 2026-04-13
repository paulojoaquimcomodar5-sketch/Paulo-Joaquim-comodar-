import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedBalanceProps {
  value: number;
  currency?: string;
  className?: string;
}

export default function AnimatedBalance({ value, currency = "MZN", className = "" }: AnimatedBalanceProps) {
  const [prevValue, setPrevValue] = useState(value);
  const [isIncreasing, setIsIncreasing] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsIncreasing(value > prevValue);
      const timer = setTimeout(() => setPrevValue(value), 1000);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: isIncreasing ? 10 : -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: isIncreasing ? -10 : 10, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="font-mono font-bold"
        >
          {currency} {value.toFixed(2)}
        </motion.span>
      </AnimatePresence>
      
      {/* Subtle glow effect on update */}
      <AnimatePresence>
        {value !== prevValue && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className={`absolute inset-0 blur-xl -z-10 rounded-full ${isIncreasing ? 'bg-green-500' : 'bg-red-500'}`}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

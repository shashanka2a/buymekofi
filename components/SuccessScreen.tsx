"use client";
import { motion } from 'motion/react';
import { CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { CoffeeCup } from './CoffeeCup';

interface SuccessScreenProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  paymentMethod: string;
}

export function SuccessScreen({ isOpen, onClose, amount, paymentMethod }: SuccessScreenProps) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Redirect to Calendly
            window.open('https://calendly.com/5ha5hank/availability', '_blank');
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, onClose]);

  const handleCalendlyRedirect = () => {
    window.open('https://calendly.com/5ha5hank/availability', '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center max-w-lg mx-4"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        {/* Success Icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
        >
          <div className="relative">
            <CheckCircle className="w-16 h-16 text-emerald-500" />
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-500/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            Payment Successful! 🎉
          </h2>
          <p className="text-zinc-400 text-lg mb-2">
            Thank you for your ${amount} support via {paymentMethod}
          </p>
          <p className="text-zinc-500 mb-6">
            Your contribution helps keep the creative work flowing
          </p>
        </motion.div>

        {/* Animated Coffee Cup */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <CoffeeCup animate={true} size="lg" />
        </motion.div>

        {/* Next Step */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
            <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-xl mb-2 text-white">Let's Connect!</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Book a call to discuss your project or just say hi
            </p>
            <p className="text-purple-400 text-sm">
              Redirecting to Calendly in {countdown}s...
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={handleCalendlyRedirect}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Book a Call Now
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Close
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-40" />
      </motion.div>
    </motion.div>
  );
}
"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Smartphone, Coins, DollarSign, Zap } from 'lucide-react';
import { PaymentCard } from '@/components/PaymentCard';
import { PaymentModal } from '@/components/PaymentModal';
import { SuccessScreen } from '@/components/SuccessScreen';
import { CoffeeCup } from '@/components/CoffeeCup';

interface Support {
  id: string;
  name: string;
  amount: number;
  message: string;
  timestamp: Date;
}

export default function Home() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastPayment, setLastPayment] = useState<{amount: number, method: string} | null>(null);

  const paymentMethods = [
    { id: 'PayPal', icon: CreditCard, label: 'PayPal', description: 'Quick & secure', gradient: false },
    { id: 'UPI', icon: Smartphone, label: 'UPI', description: 'India payments', gradient: false },
    { id: 'CashApp', icon: DollarSign, label: 'CashApp', description: 'US payments', gradient: false },
    { id: 'Zelle', icon: Zap, label: 'Zelle', description: 'Bank transfer', gradient: false },
    { id: 'Crypto', icon: Coins, label: 'Crypto', description: '10% off • USDC/ETH', gradient: true },
  ];

  const handlePaymentSuccess = (amount: number, message?: string) => {
    setLastPayment({ amount, method: selectedPayment || 'Unknown' });
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <CoffeeCup size="md" />
          </div>
          <h1 className="text-3xl md:text-4xl mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">Payment Gateway</h1>
          <p className="text-zinc-400 text-lg">Choose your preferred payment method</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, staggerChildren: 0.1 }} className="space-y-4">
          {paymentMethods.map((method, index) => (
            <motion.div key={method.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
              <PaymentCard icon={method.icon} label={method.label} description={method.description} gradient={method.gradient} onClick={() => setSelectedPayment(method.id)} layout="horizontal" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center mt-12">
          <p className="text-zinc-500 text-sm">Secure payments • All methods supported</p>
        </motion.div>
      </div>

      <PaymentModal isOpen={selectedPayment !== null} onClose={() => setSelectedPayment(null)} paymentMethod={selectedPayment || ''} onSuccess={handlePaymentSuccess} />

      <SuccessScreen isOpen={showSuccess} onClose={() => { setShowSuccess(false); setSelectedPayment(null); }} amount={lastPayment?.amount || 0} paymentMethod={lastPayment?.method || ''} />
    </div>
  );
}

"use client";
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Image from 'next/image';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: string;
  onSuccess: (amount: number, message?: string) => void;
}

const PAYMENT_DATA = {
  'PayPal': {
    qrCode: '/paypal_qr.svg',
    identifier: 'sjagannatham@ufl.edu',
    label: 'PayPal Email'
  },
  'UPI': {
    qrCode: '/paytm_qr.svg',
    identifier: 'paytmqr5k0zkc@ptys',
    label: 'UPI ID'
  },
  'CashApp': {
    qrCode: '/cashapp_qr.svg',
    identifier: '$shashankj02',
    label: 'CashApp Tag'
  },
  'Zelle': {
    qrCode: '/zelle_qr.svg',
    identifier: 'jagannathamshashank@gmail.com',
    label: 'Zelle Email'
  },
  'Crypto': {
    qrCode: '/metamask_qr.svg',
    identifier: 'sankhash.eth',
    label: 'ENS Address (USDC/ETH)'
  }
};

export function PaymentModal({ isOpen, onClose, paymentMethod, onSuccess }: PaymentModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  const isCrypto = paymentMethod === 'Crypto';
  const paymentData = PAYMENT_DATA[paymentMethod as keyof typeof PAYMENT_DATA];

  const presetAmounts = [500, 1000, 5000];
  const getDiscountedAmount = (amount: number) => {
    return isCrypto ? Math.round(amount * 0.9) : amount;
  };

  const handleCopy = async () => {
    if (paymentData?.identifier) {
      await navigator.clipboard.writeText(paymentData.identifier);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = () => {
    const amount = selectedAmount || parseFloat(customAmount) || 0;
    if (amount > 0) {
      onSuccess(amount, message);
      onClose();
    }
  };

  const getAmount = () => {
    const baseAmount = selectedAmount || parseFloat(customAmount) || 0;
    return getDiscountedAmount(baseAmount);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl">Support via {paymentMethod}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* Amount Selection */}
            <div className="mb-6">
              <label className="text-white text-sm mb-3 block">
                Choose Amount {isCrypto && <span className="text-green-400">(10% off applied)</span>}
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`
                      p-3 rounded-xl border transition-all relative
                      ${selectedAmount === amount
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-zinc-700 text-zinc-300 hover:border-zinc-600'
                      }
                    `}
                  >
                    {isCrypto ? (
                      <div className="flex flex-col">
                        <span className="text-xs text-zinc-500 line-through">${amount}</span>
                        <span>${getDiscountedAmount(amount)}</span>
                      </div>
                    ) : (
                      `${amount}`
                    )}
                  </button>
                ))}
              </div>
              
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
                {isCrypto && customAmount && parseFloat(customAmount) > 0 && (
                  <p className="text-sm text-green-400">
                    You'll pay: ${getDiscountedAmount(parseFloat(customAmount))} (10% off)
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="text-white text-sm mb-2 block">Leave a message (optional)</label>
              <Input
                placeholder="Thanks for your work!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="space-y-6">
              {/* QR Code */}
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-2xl">
                  <Image src={paymentData?.qrCode || '/paypal-qr.jpeg'} alt="QR Code" width={128} height={128} />
                </div>
              </div>

              {/* Payment ID/Address */}
              <div>
                <label className="text-white text-sm mb-2 block">{paymentData?.label}</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 p-3 bg-zinc-800 border border-zinc-700 rounded-xl">
                    <p className={`text-white text-sm break-all ${isCrypto ? 'font-mono' : ''}`}>
                      {paymentData?.identifier}
                    </p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Copy className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={getAmount() <= 0}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
              >
                {isCrypto 
                  ? `I've Sent ${getAmount()} in Crypto`
                  : `I've Sent ${getAmount()} via ${paymentMethod}`
                }
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
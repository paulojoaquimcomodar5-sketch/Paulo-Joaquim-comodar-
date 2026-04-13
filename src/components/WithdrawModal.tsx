import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowDownCircle, AlertCircle, CheckCircle2, Wallet } from 'lucide-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onWithdraw: (amount: number) => void;
}

export default function WithdrawModal({ isOpen, onClose, balance, onWithdraw }: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleWithdraw = () => {
    const numAmount = Number(amount);
    if (!amount || numAmount < 500) {
      setError('O valor mínimo de saque é 500 MT.');
      return;
    }
    if (numAmount > balance) {
      setError('Saldo insuficiente para este levantamento.');
      return;
    }
    const phoneRegex = /^(82|84|85|86|87)\d{7}$/;
    if (!phoneRegex.test(phone)) {
      setError('Número de telemóvel inválido.');
      return;
    }

    setIsProcessing(true);
    setError('');

    setTimeout(() => {
      onWithdraw(numAmount);
      alert('Pedido de saque enviado com sucesso! O processamento demora entre 1 a 24 horas.');
      setIsProcessing(false);
      onClose();
      setAmount('');
      setPhone('');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-card w-full max-w-sm p-6 rounded-3xl border border-red-500/30 shadow-2xl shadow-red-500/10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-white">
              <X size={24} />
            </button>

            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4 border border-red-500/20">
                <ArrowDownCircle size={32} />
              </div>
              <h3 className="text-xl font-bold">Solicitar Saque</h3>
              <p className="text-xs text-text-muted mt-1">Levantamento via M-Pesa / e-Mola</p>
            </div>

            <div className="bg-[#0d1117] p-4 rounded-2xl border border-border mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-muted">Saldo Disponível:</span>
                <span className="text-sm font-mono font-bold text-blue-primary">{balance.toFixed(2)} MT</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-text-muted uppercase font-bold mb-2 ml-1 block">Valor a Sacar (MT)</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Mínimo 500 MT"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 bg-[#0d1117] border border-border text-white rounded-xl focus:outline-none focus:border-red-500 transition-colors pl-10"
                  />
                  <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-text-muted uppercase font-bold mb-2 ml-1 block">Número de Recebimento</label>
                <input
                  type="text"
                  placeholder="Ex: 841234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  className="w-full p-3 bg-[#0d1117] border border-border text-white rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-red-500 text-[10px] font-bold bg-red-500/10 p-2 rounded-lg border border-red-500/20"
                >
                  <AlertCircle size={14} />
                  {error}
                </motion.div>
              )}
            </div>

            <div className="mt-6 p-3 bg-blue-primary/5 rounded-xl border border-blue-primary/10">
              <p className="text-[9px] text-blue-primary/80 leading-relaxed">
                * Taxa de levantamento: 5%<br />
                * Horário de processamento: 08:00 - 18:00<br />
                * Certifique-se de que o número está correto.
              </p>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={isProcessing}
              className="w-full py-4 mt-6 bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  A PROCESSAR...
                </>
              ) : 'CONFIRMAR SAQUE'}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

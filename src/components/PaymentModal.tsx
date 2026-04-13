import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, CheckCircle2, Phone } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<{ amount?: string; phone?: string; file?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    
    if (!amount || isNaN(Number(amount)) || Number(amount) < 100) {
      newErrors.amount = 'O valor mínimo de depósito é 100 MT.';
    }

    const phoneRegex = /^(82|84|85|86|87)\d{7}$/;
    if (!phoneRegex.test(senderPhone)) {
      newErrors.phone = 'Número inválido (deve ter 9 dígitos).';
    }

    if (!file) {
      newErrors.file = 'Por favor, anexe a foto do recibo.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = () => {
    if (!validate()) return;

    setIsSent(true);
    setTimeout(() => {
      alert('Recebido! O ADM Paulo Joaquim confirmará o seu saldo em instantes.');
      onClose();
      setIsSent(false);
      setFile(null);
      setAmount('');
      setSenderPhone('');
      setErrors({});
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
            className="relative bg-card w-full max-w-sm p-6 rounded-3xl border border-blue-primary shadow-2xl shadow-blue-primary/10 overflow-y-auto max-h-[90vh]"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-white">
              <X size={24} />
            </button>

            <h3 className="text-xl font-bold mb-6 text-center">Depósito de Investimento</h3>

            <div className="bg-[#0d1117] p-4 rounded-2xl border border-border mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase font-bold">M-Pesa</p>
                  <p className="text-sm font-mono">858778905 (Paulo Joaquim)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase font-bold">e-Mola</p>
                  <p className="text-sm font-mono">875376446 (Luisa Zulane)</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-[10px] text-text-muted uppercase font-bold mb-2 ml-1">Valor do Depósito (MT)</p>
                <input
                  type="number"
                  placeholder="Ex: 700"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full p-3 bg-[#0d1117] border ${errors.amount ? 'border-red-500' : 'border-border'} text-white rounded-xl focus:outline-none focus:border-blue-primary transition-colors`}
                />
                {errors.amount && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.amount}</p>}
              </div>

              <div>
                <p className="text-[10px] text-text-muted uppercase font-bold mb-2 ml-1">Seu Número de Envio</p>
                <input
                  type="text"
                  placeholder="Ex: 841234567"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  className={`w-full p-3 bg-[#0d1117] border ${errors.phone ? 'border-red-500' : 'border-border'} text-white rounded-xl focus:outline-none focus:border-blue-primary transition-colors`}
                />
                {errors.phone && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.phone}</p>}
              </div>
            </div>

            <p className="text-xs text-text-muted mb-4 text-center">
              Anexe o comprovativo oficial (Print):
            </p>

            <label className="block w-full cursor-pointer group">
              <div className={`border-2 border-dashed ${errors.file ? 'border-red-500' : 'border-border'} group-hover:border-blue-primary rounded-2xl p-6 flex flex-col items-center justify-center gap-2 transition-colors bg-[#0d1117]`}>
                {file ? (
                  <>
                    <CheckCircle2 className="text-green-500" size={32} />
                    <span className="text-xs font-medium text-white truncate max-w-[200px]">{file.name}</span>
                  </>
                ) : (
                  <>
                    <Upload className="text-text-muted group-hover:text-blue-primary" size={32} />
                    <span className="text-xs font-medium text-text-muted group-hover:text-blue-primary">Selecionar Imagem</span>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  if (errors.file) setErrors({ ...errors, file: undefined });
                }}
              />
            </label>
            {errors.file && <p className="text-[10px] text-red-500 mt-2 text-center">{errors.file}</p>}

            <button
              onClick={handleSend}
              disabled={isSent}
              className="w-full py-4 mt-6 bg-blue-primary text-white rounded-xl font-bold shadow-lg shadow-blue-primary/20 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSent ? 'A ENVIAR...' : 'ENVIAR COMPROVATIVO'}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

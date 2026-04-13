import React, { useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'motion/react';
import { Trophy, Ticket, ArrowLeft, Wallet } from 'lucide-react';
import AnimatedBalance from './AnimatedBalance';

interface LotteryProps {
  balance: number;
  tickets: number;
  onSpin: (cost: number, prize: number | string) => void;
  onClose: () => void;
}

export default function Lottery({ balance, tickets, onSpin, onClose }: LotteryProps) {
  const controls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<{ label: string; value: number | string } | null>(null);

  const prizes = [
    { label: '10 MT', value: 10, color: 'bg-blue-primary' },
    { label: '100 MT', value: 100, color: 'bg-card' },
    { label: '5 MT', value: 5, color: 'bg-gold' },
    { label: 'TICKET', value: 'ticket', color: 'bg-bg' },
  ];

  const handleSpin = async () => {
    if (isSpinning) return;
    if (balance < 50 && tickets < 1) {
      alert('Saldo insuficiente (Mínimo 50 MT ou 1 Ticket para girar)');
      return;
    }

    setIsSpinning(true);
    setWonPrize(null);
    const rotation = Math.floor(Math.random() * 360) + 1800; // 5+ full rotations

    await controls.start({
      rotate: rotation,
      transition: { duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }
    });

    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[prizeIndex];

    setWonPrize(prize);
    onSpin(tickets > 0 ? 0 : 50, prize.value);
    
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000); // Keep highlight for 3 seconds
  };

  return (
    <div className="min-h-screen bg-bg p-6 text-center flex flex-col items-center relative overflow-hidden">
      <AnimatePresence>
        {wonPrize && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-blue-primary/20 backdrop-blur-sm absolute inset-0" />
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-card border-2 border-gold p-8 rounded-[40px] shadow-[0_0_50px_rgba(227,179,65,0.5)] text-center relative z-10"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Trophy size={64} className="text-gold mx-auto mb-4" />
              </motion.div>
              <h3 className="text-text-muted text-xs uppercase font-bold tracking-widest mb-2">Prémio Ganho!</h3>
              <p className="text-4xl font-bold text-white tracking-tighter">{wonPrize.label}</p>
              
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute -inset-4 border-2 border-gold/30 rounded-[48px] -z-10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-3xl font-bold text-blue-primary mb-2 tracking-tighter">MOZA INV</div>
      <h2 className="text-2xl font-bold text-gold mb-2 flex items-center gap-2">
        <Trophy size={24} />
        Roleta da Sorte
      </h2>
      <p className="text-text-muted text-sm mb-8">Gaste 1 Ticket ou 50 MT para girar e ganhar bónus!</p>

      <div className="relative w-72 h-72 mb-8">
        {/* Pointer */}
        <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-500" />
        
        <motion.div
          animate={controls}
          className="w-full h-full rounded-full border-[10px] border-gold relative overflow-hidden shadow-2xl shadow-gold/20"
          style={{
            background: 'conic-gradient(#00a2ff 0% 25%, #161b22 25% 50%, #e3b341 50% 75%, #0b0e14 75% 100%)'
          }}
        >
          {/* Prize Labels */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 text-black font-bold text-sm">10 MT</div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 text-white font-bold text-sm rotate-90">100 MT</div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black font-bold text-sm">5 MT</div>
          <div className="absolute top-1/2 left-4 -translate-y-1/2 text-white font-bold text-sm -rotate-90">TICKET</div>
        </motion.div>
      </div>

      <div className="bg-card p-4 rounded-2xl border border-border mb-3 w-full max-w-xs flex justify-between items-center">
        <div className="flex items-center gap-2 text-text-muted">
          <Wallet size={18} />
          <span>Saldo:</span>
        </div>
        <AnimatedBalance value={balance} className="text-blue-primary" />
      </div>

      <div className="bg-card p-4 rounded-2xl border border-border mb-6 w-full max-w-xs flex justify-between items-center">
        <div className="flex items-center gap-2 text-text-muted">
          <Ticket size={18} />
          <span>Tickets:</span>
        </div>
        <AnimatePresence mode="popLayout">
          <motion.b
            key={tickets}
            initial={{ scale: 1.5, color: '#e3b341' }}
            animate={{ scale: 1, color: '#e3b341' }}
            className="text-gold text-lg font-mono"
          >
            {tickets}
          </motion.b>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-xs space-y-3">
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full py-4 bg-gold text-black rounded-xl font-bold shadow-lg shadow-gold/20 active:scale-95 transition-all disabled:opacity-50"
        >
          {isSpinning ? 'A GIRAR...' : `GIRAR (${tickets > 0 ? 'GRÁTIS' : '50 MT'})`}
        </button>
        <button
          onClick={onClose}
          className="w-full py-4 bg-card text-white rounded-xl font-bold border border-border flex items-center justify-center gap-2 hover:bg-border/50 transition-colors"
        >
          <ArrowLeft size={18} />
          VOLTAR
        </button>
      </div>
    </div>
  );
}

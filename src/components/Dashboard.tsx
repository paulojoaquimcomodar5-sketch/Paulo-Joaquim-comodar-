import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ArrowUpCircle, 
  Users, 
  Briefcase, 
  ClipboardList, 
  Headphones, 
  Wallet, 
  Dices,
  ChevronRight
} from 'lucide-react';
import { User, BANNERS, VIP_PLANS } from '../types';
import Logo from './Logo';
import AnimatedBalance from './AnimatedBalance';

interface DashboardProps {
  user: User;
  onOpenPayment: () => void;
  onOpenLottery: () => void;
  onOpenWithdraw: () => void;
  onOpenCompany: () => void;
}

export default function Dashboard({ user, onOpenPayment, onOpenLottery, onOpenWithdraw, onOpenCompany }: DashboardProps) {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { icon: ArrowUpCircle, label: 'Recarga', color: 'text-green-500', action: onOpenPayment },
    { icon: TrendingUp, label: 'Saque', color: 'text-red-500', action: onOpenWithdraw },
    { icon: Dices, label: 'Lotaria', color: 'text-gold', action: onOpenLottery },
    { icon: Users, label: 'Equipe', color: 'text-blue-400' },
    { icon: Wallet, label: 'Fundo', color: 'text-purple-400' },
    { icon: ClipboardList, label: 'Tarefa', color: 'text-orange-400' },
    { icon: Briefcase, label: 'Empresa', color: 'text-gray-400', action: onOpenCompany },
    { icon: Headphones, label: 'Suporte', color: 'text-cyan-400' },
  ];

  return (
    <div className="pb-24">
      <header className="p-4 bg-card border-b border-border sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <b className="text-xl tracking-tighter">MOZA INV</b>
          </div>
          <span className="text-[10px] font-bold bg-blue-primary/10 text-blue-primary px-2 py-1 rounded-md border border-blue-primary/20">
            Convite: {user.inviteCode}
          </span>
        </div>

        <div className="relative h-32 overflow-hidden rounded-2xl mb-4 border border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={bannerIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`absolute inset-0 flex items-center justify-center p-6 text-center font-bold text-lg ${BANNERS[bannerIndex].color}`}
            >
              {BANNERS[bannerIndex].text}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center bg-[#0d1117] p-4 rounded-2xl border border-border shadow-inner">
          <div>
            <p className="text-text-muted text-[10px] uppercase tracking-widest font-semibold mb-1">Saldo Disponível</p>
            <AnimatedBalance value={user.balance} className="text-2xl" />
          </div>
          <div className="text-right">
            <p className="text-text-muted text-[10px] uppercase tracking-widest font-semibold mb-1">Nível</p>
            <p className="text-blue-primary font-bold">{user.level}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4 p-6">
        {menuItems.map((item, idx) => (
          <motion.div
            key={idx}
            whileTap={{ scale: 0.9 }}
            onClick={item.action}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center mb-2 shadow-lg ${item.color}`}>
              <item.icon size={20} />
            </div>
            <span className="text-[10px] text-text-muted font-medium">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <section className="px-4">
        <h3 className="text-blue-primary font-bold ml-2 mb-4 flex items-center gap-2">
          <TrendingUp size={16} />
          Planos Populares
        </h3>
        <div className="space-y-3">
          {VIP_PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-4 rounded-2xl border border-border border-l-4 border-l-blue-primary flex justify-between items-center shadow-md"
            >
              <div>
                <p className="font-bold text-lg">{plan.name}</p>
                <p className="text-xs text-text-muted">
                  Investir: <span className="text-white font-mono">{plan.investment} MT</span> | 
                  Ganho: <span className="text-green-400 font-mono">{plan.dailyGain}/dia</span>
                </p>
              </div>
              <button
                onClick={onOpenPayment}
                className="bg-blue-primary text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg shadow-blue-primary/20 active:scale-95 transition-transform"
              >
                Participar
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

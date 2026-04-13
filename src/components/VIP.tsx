import React from 'react';
import { motion } from 'motion/react';
import { Star, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import { VIP_PLANS } from '../types';

interface VIPProps {
  currentLevel: string;
  onOpenPayment: () => void;
}

export default function VIP({ currentLevel, onOpenPayment }: VIPProps) {
  return (
    <div className="pb-24 p-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-blue-primary tracking-tighter mb-2">Níveis VIP</h2>
        <p className="text-text-muted text-sm">Aumente o seu nível para desbloquear maiores ganhos diários.</p>
      </header>

      <div className="space-y-6">
        {VIP_PLANS.map((plan) => {
          const isCurrent = currentLevel === plan.name;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative overflow-hidden bg-card rounded-3xl border ${
                isCurrent ? 'border-blue-primary shadow-lg shadow-blue-primary/10' : 'border-border'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 right-0 bg-blue-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                  NÍVEL ATUAL
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    plan.id > 3 ? 'bg-gold/10 text-gold' : 'bg-blue-primary/10 text-blue-primary'
                  }`}>
                    <Star size={28} fill="currentColor" fillOpacity={0.2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-text-muted text-xs">Investimento: <span className="text-white font-mono">{plan.investment} MT</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[#0d1117] p-3 rounded-2xl border border-border">
                    <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Ganho Diário</p>
                    <p className="text-green-400 font-bold font-mono">{plan.dailyGain} MT</p>
                  </div>
                  <div className="bg-[#0d1117] p-3 rounded-2xl border border-border">
                    <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Ganho Mensal</p>
                    <p className="text-blue-primary font-bold font-mono">{plan.dailyGain * 30} MT</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-[10px] text-text-muted">
                    <Zap size={12} className="text-blue-primary" /> Saques prioritários
                  </li>
                  <li className="flex items-center gap-2 text-[10px] text-text-muted">
                    <ShieldCheck size={12} className="text-blue-primary" /> Suporte dedicado 24/7
                  </li>
                  <li className="flex items-center gap-2 text-[10px] text-text-muted">
                    <TrendingUp size={12} className="text-blue-primary" /> Comissões de equipe aumentadas
                  </li>
                </ul>

                <button
                  onClick={onOpenPayment}
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    isCurrent 
                      ? 'bg-border text-text-muted cursor-default' 
                      : 'bg-blue-primary text-white shadow-lg shadow-blue-primary/20 active:scale-95'
                  }`}
                >
                  {isCurrent ? 'Nível Ativo' : `Ativar ${plan.name}`}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

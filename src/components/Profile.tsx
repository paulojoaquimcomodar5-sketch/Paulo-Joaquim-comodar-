import React from 'react';
import { motion } from 'motion/react';
import { 
  User as UserIcon, 
  Wallet, 
  History, 
  Settings, 
  LogOut, 
  Shield, 
  ChevronRight,
  CreditCard,
  Headphones
} from 'lucide-react';
import { User } from '../types';
import AnimatedBalance from './AnimatedBalance';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  onOpenPayment: () => void;
  onOpenChat: () => void;
  onOpenSecurity: () => void;
  onOpenSettings: () => void;
}

export default function Profile({ 
  user, 
  onLogout, 
  onOpenPayment, 
  onOpenChat,
  onOpenSecurity,
  onOpenSettings
}: ProfileProps) {
  const menuGroups = [
    {
      title: 'Financeiro',
      items: [
        { icon: Wallet, label: 'Meu Saldo', value: `${user.balance.toFixed(2)} MT`, action: () => {} },
        { icon: CreditCard, label: 'Recarregar', action: onOpenPayment },
        { 
          icon: History, 
          label: 'Histórico de Transações', 
          action: () => alert('Funcionalidade em desenvolvimento') 
        },
      ]
    },
    {
      title: 'Suporte & Ajuda',
      items: [
        { 
          icon: Headphones, 
          label: 'Suporte ao Cliente', 
          action: onOpenChat
        },
      ]
    },
    {
      title: 'Conta',
      items: [
        { icon: Shield, label: 'Segurança da Conta', action: onOpenSecurity },
        { icon: Settings, label: 'Definições', action: onOpenSettings },
      ]
    }
  ];

  return (
    <div className="pb-24">
      <div className="bg-card p-8 pt-12 rounded-b-[40px] border-b border-border text-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-primary/5 rounded-full blur-3xl -z-10" />
        
        <div className="w-24 h-24 bg-blue-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-bg shadow-xl">
          <UserIcon size={48} className="text-blue-primary" />
        </div>
        
        <h3 className="text-xl font-bold mb-1">{user.phone}</h3>
        <div className="inline-flex items-center gap-2 bg-blue-primary/10 text-blue-primary px-3 py-1 rounded-full text-xs font-bold border border-blue-primary/20">
          <Shield size={12} />
          {user.level}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-bg/50 p-4 rounded-2xl border border-border">
            <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Saldo Total</p>
            <AnimatedBalance value={user.balance} currency="MT" className="text-lg text-blue-primary" />
          </div>
          <div className="bg-bg/50 p-4 rounded-2xl border border-border">
            <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Tickets</p>
            <p className="text-lg font-bold font-mono text-gold">{user.tickets}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="text-[10px] text-text-muted uppercase font-bold ml-2 tracking-widest">{group.title}</h4>
            <div className="bg-card rounded-3xl border border-border overflow-hidden">
              {group.items.map((item, iIdx) => (
                <button
                  key={iIdx}
                  onClick={item.action}
                  className={`w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors ${
                    iIdx !== group.items.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center text-text-muted">
                    <item.icon size={20} />
                  </div>
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                  {item.value && <span className="text-xs font-mono font-bold text-blue-primary">{item.value}</span>}
                  <ChevronRight size={16} className="text-text-muted" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={onLogout}
          className="w-full p-4 bg-red-500/10 text-red-500 rounded-2xl border border-red-500/20 flex items-center justify-center gap-2 font-bold hover:bg-red-500/20 transition-colors mt-4"
        >
          <LogOut size={20} />
          Sair da Conta
        </button>
      </div>
    </div>
  );
}

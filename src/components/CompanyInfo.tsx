import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Building2, ShieldCheck, Globe, Award, Users, Target } from 'lucide-react';
import Logo from './Logo';

interface CompanyInfoProps {
  onClose: () => void;
}

export default function CompanyInfo({ onClose }: CompanyInfoProps) {
  const stats = [
    { icon: Users, label: 'Investidores', value: '50k+' },
    { icon: Globe, label: 'Países', value: '12' },
    { icon: Award, label: 'Anos no Mercado', value: '5' },
  ];

  const values = [
    { title: 'Transparência', desc: 'Relatórios diários de rendimentos para todos os VIPs.' },
    { title: 'Segurança', desc: 'Proteção de capital garantida por fundos de reserva.' },
    { title: 'Inovação', desc: 'Algoritmos de trading de alta frequência em mercados globais.' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-bg overflow-y-auto pb-10">
      <header className="p-4 bg-card border-b border-border sticky top-0 z-10 flex items-center gap-4">
        <button onClick={onClose} className="text-text-muted hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h3 className="font-bold">Sobre a Empresa</h3>
      </header>

      <div className="p-6">
        <div className="flex flex-col items-center text-center mb-10">
          <Logo className="w-24 h-24 mb-4" />
          <h2 className="text-3xl font-bold tracking-tighter mb-2">MOZA INV</h2>
          <div className="inline-flex items-center gap-2 bg-blue-primary/10 text-blue-primary px-3 py-1 rounded-full text-[10px] font-bold border border-blue-primary/20 uppercase tracking-widest">
            <ShieldCheck size={12} />
            Entidade Certificada
          </div>
          <p className="text-text-muted text-sm mt-6 leading-relaxed max-w-xs">
            A MOZA INV é uma plataforma líder em gestão de ativos digitais e investimentos de alto rendimento, focada em democratizar o acesso ao mercado financeiro global.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-card p-3 rounded-2xl border border-border text-center">
              <stat.icon size={20} className="text-blue-primary mx-auto mb-2" />
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-[8px] text-text-muted uppercase font-bold">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-bold flex items-center gap-2 text-blue-primary">
            <Target size={18} />
            Nossa Missão
          </h4>
          <div className="bg-card p-5 rounded-3xl border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Building2 size={80} />
            </div>
            <p className="text-sm text-text-muted leading-relaxed relative z-10">
              Proporcionar liberdade financeira através de tecnologia de ponta e estratégias de investimento diversificadas, garantindo retornos sustentáveis para a nossa comunidade em Moçambique e no mundo.
            </p>
          </div>

          <h4 className="text-sm font-bold flex items-center gap-2 text-blue-primary">
            <ShieldCheck size={18} />
            Valores Fundamentais
          </h4>
          <div className="grid gap-4">
            {values.map((v, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-card rounded-2xl border border-border">
                <div className="w-10 h-10 rounded-xl bg-blue-primary/10 flex items-center justify-center text-blue-primary shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-bold text-sm mb-1">{v.title}</p>
                  <p className="text-xs text-text-muted leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-br from-blue-primary/20 to-gold/10 rounded-[32px] border border-white/10 text-center">
          <p className="text-xs font-bold mb-2">Pronto para crescer connosco?</p>
          <p className="text-[10px] text-text-muted mb-6">Junte-se a milhares de investidores que já confiam na MOZA INV.</p>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm active:scale-95 transition-transform"
          >
            COMEÇAR AGORA
          </button>
        </div>
      </div>
    </div>
  );
}

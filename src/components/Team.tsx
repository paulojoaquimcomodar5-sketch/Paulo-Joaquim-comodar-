import React from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, Gift, Copy, Share2 } from 'lucide-react';

interface TeamProps {
  inviteCode: string;
}

export default function Team({ inviteCode }: TeamProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado para a área de transferência!');
  };

  const teamData = {
    total: 12,
    active: 8,
    today: 2,
    totalCommission: 450.50,
    levels: [
      { name: 'Nível 1', members: 5, active: 4, commission: 250.00, percent: '10%', desc: 'Amigos diretos' },
      { name: 'Nível 2', members: 4, active: 3, commission: 125.50, percent: '5%', desc: 'Convidados do Nível 1' },
      { name: 'Nível 3', members: 3, active: 1, commission: 75.00, percent: '2%', desc: 'Convidados do Nível 2' },
    ]
  };

  const stats = [
    { label: 'Total da Equipe', value: teamData.total.toString(), icon: Users, color: 'text-blue-primary' },
    { label: 'Membros Ativos', value: teamData.active.toString(), icon: UserPlus, color: 'text-green-500' },
    { label: 'Comissão Total', value: `${teamData.totalCommission.toFixed(2)} MT`, icon: Gift, color: 'text-gold' },
  ];

  return (
    <div className="pb-24 p-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-blue-primary tracking-tighter mb-2">Minha Equipe</h2>
        <p className="text-text-muted text-sm">Convide amigos e ganhe comissões em 3 níveis.</p>
      </header>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card p-3 rounded-2xl border border-border text-center"
          >
            <stat.icon size={20} className={`mx-auto mb-2 ${stat.color}`} />
            <p className="text-[9px] text-text-muted uppercase font-bold mb-1 leading-tight">{stat.label}</p>
            <p className="text-xs font-bold font-mono">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-card p-6 rounded-3xl border border-border mb-8">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Share2 size={18} className="text-blue-primary" />
          Link de Convite
        </h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-[10px] text-text-muted uppercase font-bold mb-2">Código de Convite</p>
            <div className="flex items-center gap-2 bg-[#0d1117] p-3 rounded-xl border border-border">
              <span className="flex-1 font-mono font-bold text-blue-primary">{inviteCode}</span>
              <button onClick={() => copyToClipboard(inviteCode)} className="text-text-muted hover:text-white">
                <Copy size={18} />
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] text-text-muted uppercase font-bold mb-2">Link de Registo</p>
            <div className="flex items-center gap-2 bg-[#0d1117] p-3 rounded-xl border border-border">
              <span className="flex-1 font-mono text-[10px] text-text-muted truncate">
                https://moza-inv.app/reg?ref={inviteCode}
              </span>
              <button onClick={() => copyToClipboard(`https://moza-inv.app/reg?ref=${inviteCode}`)} className="text-text-muted hover:text-white">
                <Copy size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold ml-2">Resumo por Nível</h3>
        <div className="space-y-3">
          {teamData.levels.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-card p-4 rounded-2xl border border-border"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">{item.name}</p>
                    <span className="text-[10px] bg-blue-primary/10 text-blue-primary px-2 py-0.5 rounded font-bold">
                      {item.percent}
                    </span>
                  </div>
                  <p className="text-[10px] text-text-muted">{item.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-green-400 font-mono">+{item.commission.toFixed(2)} MT</p>
                  <p className="text-[9px] text-text-muted uppercase font-bold">Comissão</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/50">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-text-muted">Membros:</span>
                  <span className="text-[10px] font-bold">{item.members}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-text-muted">Ativos:</span>
                  <span className="text-[10px] font-bold text-green-500">{item.active}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

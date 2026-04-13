import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, Smartphone, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface SecuritySettingsProps {
  onBack: () => void;
}

export default function SecuritySettings({ onBack }: SecuritySettingsProps) {
  const [showPass, setShowPass] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChanging(true);
    setTimeout(() => {
      setIsChanging(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg pb-10">
      <header className="p-4 bg-card border-b border-border sticky top-0 z-10 flex items-center gap-4">
        <button onClick={onBack} className="text-text-muted hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h3 className="font-bold">Segurança da Conta</h3>
      </header>

      <div className="p-6 space-y-6">
        <div className="bg-blue-primary/5 p-6 rounded-[32px] border border-blue-primary/10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-blue-primary/10 flex items-center justify-center text-blue-primary mb-4">
            <Shield size={32} />
          </div>
          <h4 className="font-bold mb-1">Proteção Ativa</h4>
          <p className="text-xs text-text-muted">A sua conta está protegida com encriptação de ponta a ponta.</p>
        </div>

        <section className="space-y-4">
          <h4 className="text-[10px] text-text-muted uppercase font-bold ml-2 tracking-widest">Alterar Palavra-passe</h4>
          <form onSubmit={handleUpdatePassword} className="bg-card p-6 rounded-3xl border border-border space-y-4">
            <div>
              <label className="text-[10px] text-text-muted uppercase font-bold mb-2 block ml-1">Palavra-passe Atual</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full p-3 bg-[#0d1117] border border-border rounded-xl focus:outline-none focus:border-blue-primary text-sm"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-text-muted uppercase font-bold mb-2 block ml-1">Nova Palavra-passe</label>
              <input
                type="password"
                className="w-full p-3 bg-[#0d1117] border border-border rounded-xl focus:outline-none focus:border-blue-primary text-sm"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <button
              type="submit"
              disabled={isChanging}
              className="w-full py-3 bg-blue-primary text-white rounded-xl font-bold text-sm active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isChanging ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : success ? (
                <><CheckCircle2 size={18} /> Atualizado!</>
              ) : 'Atualizar Palavra-passe'}
            </button>
          </form>
        </section>

        <section className="space-y-4">
          <h4 className="text-[10px] text-text-muted uppercase font-bold ml-2 tracking-widest">Verificação em Duas Etapas</h4>
          <div className="bg-card p-4 rounded-3xl border border-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
              <Smartphone size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">SMS de Verificação</p>
              <p className="text-[10px] text-text-muted">Ativo para o número registado</p>
            </div>
            <div className="w-10 h-5 bg-blue-primary rounded-full relative">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
        </section>

        <div className="p-4 bg-gold/5 rounded-2xl border border-gold/10 flex gap-3">
          <Lock size={20} className="text-gold shrink-0" />
          <p className="text-[10px] text-gold/80 leading-relaxed">
            Dica de Segurança: Nunca partilhe o seu código de convite ou palavra-passe com ninguém, mesmo que aleguem ser do suporte oficial da MOZA INV.
          </p>
        </div>
      </div>
    </div>
  );
}

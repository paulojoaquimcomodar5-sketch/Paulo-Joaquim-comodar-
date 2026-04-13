import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User } from '../types';
import Logo from './Logo';

interface AuthProps {
  onLogin: (user: User) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [errors, setErrors] = useState<{ phone?: string; password?: string; invite?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    
    // Phone validation (Mozambique format: 9 digits, starts with 82, 84, 85, 86, 87)
    const phoneRegex = /^(82|84|85|86|87)\d{7}$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Número inválido. Deve ter 9 dígitos e começar por 82, 84, 85, 86 ou 87.';
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = 'A palavra-passe deve ter pelo menos 6 caracteres.';
    }

    // Invite code validation
    if (!isLogin && !inviteCode.trim()) {
      newErrors.invite = 'O código de convite é obrigatório para o registo.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = () => {
    if (!validate()) return;

    const generatedInvite = `MOZA-${phone.substring(0, 4)}`;
    onLogin({
      phone,
      inviteCode: generatedInvite,
      balance: 25.0,
      level: 'PreVIP',
      tickets: 0,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card p-8 rounded-3xl w-full max-w-xs text-center border border-border shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-primary via-green-400 to-gold" />
        
        <Logo className="w-20 h-20 mx-auto mb-4" />
        <div className="text-4xl font-bold text-white mb-2 tracking-tighter">MOZA INV</div>
        <p className="text-text-muted text-sm mb-6">{isLogin ? 'Iniciar Sessão' : 'Registo (MOZA INV)'}</p>
        
        <div className="space-y-3 text-left">
          <div>
            <input
              type="text"
              placeholder="Telemóvel (Ex: 841234567)"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, '').slice(0, 9));
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              className={`w-full p-3 bg-[#0d1117] border ${errors.phone ? 'border-red-500' : 'border-border'} text-white rounded-xl focus:outline-none focus:border-blue-primary transition-colors`}
            />
            {errors.phone && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Palavra-passe"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              className={`w-full p-3 bg-[#0d1117] border ${errors.password ? 'border-red-500' : 'border-border'} text-white rounded-xl focus:outline-none focus:border-blue-primary transition-colors`}
            />
            {errors.password && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.password}</p>}
          </div>

          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Código de Convite"
                value={inviteCode}
                onChange={(e) => {
                  setInviteCode(e.target.value);
                  if (errors.invite) setErrors({ ...errors, invite: undefined });
                }}
                className={`w-full p-3 bg-[#0d1117] border ${errors.invite ? 'border-red-500' : 'border-border'} text-white rounded-xl focus:outline-none focus:border-blue-primary transition-colors`}
              />
              {errors.invite && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.invite}</p>}
            </div>
          )}
        </div>

        <button
          onClick={handleAuth}
          className="w-full py-4 mt-6 bg-blue-primary text-white rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-blue-primary/20"
        >
          {isLogin ? 'ENTRAR' : 'CRIAR CONTA'}
        </button>

        <p className="mt-6 text-xs text-text-muted">
          {isLogin ? 'Não tem conta?' : 'Já tem uma conta?'}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-primary cursor-pointer font-bold hover:underline"
          >
            {isLogin ? 'Registe-se' : 'Inicie Sessão'}
          </span>
        </p>
      </motion.div>
    </div>
  );
}

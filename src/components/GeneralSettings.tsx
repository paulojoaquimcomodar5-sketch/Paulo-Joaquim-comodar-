import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Globe, Bell, Moon, Info, ChevronRight, Trash2 } from 'lucide-react';

interface GeneralSettingsProps {
  onBack: () => void;
}

export default function GeneralSettings({ onBack }: GeneralSettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const settingsGroups = [
    {
      title: 'Preferências',
      items: [
        { 
          icon: Globe, 
          label: 'Idioma', 
          value: 'Português (MZ)',
          action: () => alert('Outros idiomas em breve')
        },
        { 
          icon: Bell, 
          label: 'Notificações Push', 
          toggle: true, 
          state: notifications, 
          onToggle: () => setNotifications(!notifications) 
        },
        { 
          icon: Moon, 
          label: 'Modo Escuro', 
          toggle: true, 
          state: darkMode, 
          onToggle: () => setDarkMode(!darkMode) 
        },
      ]
    },
    {
      title: 'Sobre a Aplicação',
      items: [
        { icon: Info, label: 'Versão', value: 'v2.4.0', action: () => {} },
        { icon: ChevronRight, label: 'Termos e Condições', action: () => {} },
        { icon: ChevronRight, label: 'Política de Privacidade', action: () => {} },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-bg pb-10">
      <header className="p-4 bg-card border-b border-border sticky top-0 z-10 flex items-center gap-4">
        <button onClick={onBack} className="text-text-muted hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h3 className="font-bold">Definições</h3>
      </header>

      <div className="p-6 space-y-8">
        {settingsGroups.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="text-[10px] text-text-muted uppercase font-bold ml-2 tracking-widest">{group.title}</h4>
            <div className="bg-card rounded-3xl border border-border overflow-hidden">
              {group.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  onClick={item.action}
                  className={`w-full p-4 flex items-center gap-4 ${
                    iIdx !== group.items.length - 1 ? 'border-b border-border' : ''
                  } ${item.action ? 'hover:bg-white/5 cursor-pointer' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center text-text-muted">
                    <item.icon size={20} />
                  </div>
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                  
                  {item.value && (
                    <span className="text-xs text-text-muted">{item.value}</span>
                  )}

                  {item.toggle && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        item.onToggle?.();
                      }}
                      className={`w-10 h-5 rounded-full relative transition-colors ${
                        item.state ? 'bg-blue-primary' : 'bg-border'
                      }`}
                    >
                      <motion.div 
                        animate={{ x: item.state ? 20 : 4 }}
                        className="absolute top-1 w-3 h-3 bg-white rounded-full"
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => alert('Cache limpa com sucesso!')}
          className="w-full p-4 bg-card text-red-500 rounded-2xl border border-border flex items-center justify-center gap-2 font-bold hover:bg-red-500/5 transition-colors"
        >
          <Trash2 size={20} />
          Limpar Cache
        </button>

        <p className="text-center text-[10px] text-text-muted mt-10">
          © 2026 MOZA INV. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}

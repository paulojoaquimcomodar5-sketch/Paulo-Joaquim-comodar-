import React from 'react';
import { Home, ClipboardList, Star, Users, User as UserIcon } from 'lucide-react';
import { Screen } from '../types';

interface NavBarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function NavBar({ currentScreen, onNavigate }: NavBarProps) {
  const items = [
    { id: 'dashboard', label: 'Lar', icon: Home },
    { id: 'tasks', label: 'Tarefa', icon: ClipboardList },
    { id: 'vip', label: 'VIP', icon: Star },
    { id: 'team', label: 'Equipe', icon: Users },
    { id: 'profile', label: 'Meu', icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 flex justify-around items-center z-40 pb-safe">
      {items.map((item) => {
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className={`flex flex-col items-center gap-1 p-2 transition-colors ${
              isActive ? 'text-blue-primary' : 'text-text-muted'
            }`}
          >
            <item.icon size={20} className={isActive ? 'animate-pulse' : ''} />
            <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

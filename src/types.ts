export type Screen = 'auth' | 'dashboard' | 'lottery' | 'team' | 'tasks' | 'vip' | 'profile' | 'chat' | 'company' | 'security' | 'settings';

export interface User {
  phone: string;
  inviteCode: string;
  balance: number;
  level: string;
  tickets: number;
}

export interface VIPPlan {
  id: number;
  name: string;
  investment: number;
  dailyGain: number;
}

export const VIP_PLANS: VIPPlan[] = [
  { id: 1, name: 'VIP 1', investment: 700, dailyGain: 36 },
  { id: 2, name: 'VIP 2', investment: 2500, dailyGain: 130 },
  { id: 3, name: 'VIP 3', investment: 7500, dailyGain: 280 },
  { id: 4, name: 'VIP 4', investment: 15000, dailyGain: 600 },
  { id: 5, name: 'VIP 5', investment: 35000, dailyGain: 1500 },
  { id: 6, name: 'VIP 6', investment: 80000, dailyGain: 3600 },
];

export interface Banner {
  id: number;
  text: string;
  color: string;
}

export const BANNERS: Banner[] = [
  { id: 1, text: 'Bem-vindo a MOZA INV', color: 'bg-card text-blue-primary' },
  { id: 2, text: 'VIP 2 Atualizado: Ganhe 130 MT Diários!', color: 'bg-card text-gold' },
  { id: 3, text: 'Pagamentos via M-Pesa Paulo Joaquim', color: 'bg-bg text-white' },
];
